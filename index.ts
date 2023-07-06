import {
  AmplifyAppSyncSimulatorAuthenticationType,
  RESOLVER_KIND,
} from "@aws-amplify/amplify-appsync-simulator";
import { AppSyncResolverHandler } from "aws-lambda";
import fs from "fs";
import { AppSyncSimulator, AppSyncSimulatorConfig } from "./simulator";
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

const httpResponseTemplate = fs.readFileSync(
  "./mapping-templates/http.response.vtl",
  "utf8"
);

const swapiRequestMapplingTemplate = fs.readFileSync(
  "./mapping-templates/Query.swapiPeople.request.vtl",
  "utf8"
);

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

const baseConfig: AppSyncSimulatorConfig = {
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
    },
    {
      type: "AWS_LAMBDA",
      name: "testLambda",
      invoke: testFunction,
    },
    {
      type: "HTTP",
      name: "httpSwapi",
      config: {
        endpoint: "http://swapi.dev/api/",
      },
    },
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
    {
      kind: RESOLVER_KIND.UNIT,
      typeName: "Query",
      fieldName: "swapiPeople",
      dataSourceName: "httpSwapi",
      requestMappingTemplate: swapiRequestMapplingTemplate,
      responseMappingTemplate: httpResponseTemplate,
    },
  ],
};

async function setup() {
  const graphQLApiSimulator = new AppSyncSimulator({
    serverConfig: {
      port: 3000,
      wsPort: 3001,
    },
    simulatorConfig: baseConfig,
  });

  await graphQLApiSimulator.start();

  console.log("RUNNING ON", graphQLApiSimulator.url);
}

if (require.main === module) {
  setup();
}
