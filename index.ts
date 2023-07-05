import fs from "fs";
import {
  AmplifyAppSyncSimulator,
  AmplifyAppSyncSimulatorAuthenticationType,
  AmplifyAppSyncSimulatorConfig,
  AppSyncSimulatorDataSourceLambdaConfig,
  RESOLVER_KIND,
} from "@aws-amplify/amplify-appsync-simulator";
import { AppSyncResolverHandler } from "aws-lambda";
import { Query, QueryTestArgs } from "./types/schema";

// Templates that are equivalent to the direct Lambda resolver behavior,
// based on what we've seen with deployed direct Lambda resolvers.
const directLambdaRequestTemplate = `## Direct lambda request
{
    "version": "2018-05-29",
    "operation": "Invoke",
    "payload": $utils.toJson($context)
}`;
const directLambdaResponseTemplate = `## Direct lambda response
#if($ctx.error)
    $util.error($ctx.error.message, $ctx.error.type, $ctx.result)
#end
$util.toJson($ctx.result)`;

// Replace with your GraphQL schema
const schemaContent = fs.readFileSync("./graphql/schema.graphql", "utf8");

const storiesFunction: AppSyncResolverHandler<any, Query["stories"]> = async (
  event,
  context
) => {
  return [{ id: "noop", name: "banana", sport: event.arguments?.sport }];
};

const testFunction: AppSyncResolverHandler<
  QueryTestArgs,
  Query["test"]
> = async (event, context) => {
  return { id: "noop", name: "banana", sport: event.arguments.sport };
};

const baseConfig: AmplifyAppSyncSimulatorConfig = {
  appSync: {
    defaultAuthenticationType: {
      authenticationType: AmplifyAppSyncSimulatorAuthenticationType.API_KEY,
    },
    name: "test",
    apiKey: "da2-fakeApiId123456",
    additionalAuthenticationProviders: [],
  },
  schema: { content: schemaContent },
  dataSources: [
    {
      type: "AWS_LAMBDA",
      name: "storiesLambda",
      invoke: storiesFunction,
    } as AppSyncSimulatorDataSourceLambdaConfig,
    {
      type: "AWS_LAMBDA",
      name: "testLambda",
      invoke: testFunction,
    } as AppSyncSimulatorDataSourceLambdaConfig,
  ],
  resolvers: [
    // Add your own resolver mappings here
    {
      kind: RESOLVER_KIND.UNIT,
      typeName: "Query",
      fieldName: "stories",
      dataSourceName: "storiesLambda",
      requestMappingTemplate: directLambdaRequestTemplate,
      responseMappingTemplate: directLambdaResponseTemplate,
    },
    {
      kind: RESOLVER_KIND.UNIT,
      typeName: "Query",
      fieldName: "test",
      dataSourceName: "testLambda",
      requestMappingTemplate: directLambdaRequestTemplate,
      responseMappingTemplate: directLambdaResponseTemplate,
    },
  ],
};

async function setup() {
  const graphQLApiSimulator = new AmplifyAppSyncSimulator({
    port: 3000,
    wsPort: 3001,
  });

  await graphQLApiSimulator.start();
  await graphQLApiSimulator.init(baseConfig);

  console.log("RUNNING ON", graphQLApiSimulator.url);
}

if (require.main === module) {
  setup();
}
