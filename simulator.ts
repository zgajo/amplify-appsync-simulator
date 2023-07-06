import {
  AmplifyAppSyncSimulator,
  AmplifyAppSyncSimulatorConfig,
  AppSyncSimulatorDataSourceConfig,
  AppSyncSimulatorDataSourceType,
  AppSyncSimulatorServerConfig,
  addDataLoader,
} from "@aws-amplify/amplify-appsync-simulator";
import HttpDataLoader, { HTTPLoaderConfig } from "./data-loaders/http";

export type AppSyncSimulatorConfig = Omit<
  AmplifyAppSyncSimulatorConfig,
  "dataSources"
> & {
  dataSources: Partial<AppSyncSimulatorDataSourceConfig | HTTPLoaderConfig>[];
};

export class AppSyncSimulator extends AmplifyAppSyncSimulator {
  constructor(props: {
    serverConfig?: AppSyncSimulatorServerConfig | undefined;
    simulatorConfig: AppSyncSimulatorConfig;
  }) {
    super(props.serverConfig);

    addDataLoader(
      "HTTP" as unknown as AppSyncSimulatorDataSourceType,
      HttpDataLoader as any
    );

    this.init(
      props.simulatorConfig as unknown as AmplifyAppSyncSimulatorConfig
    );

    return this;
  }
}
