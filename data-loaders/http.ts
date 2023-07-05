import { AmplifyAppSyncSimulatorDataLoader } from "@aws-amplify/amplify-appsync-simulator/lib/data-loader";
import axios from "axios";
import { isObject, forEach } from "lodash";

const paramsSerializer = (params: any) => {
  const parts: string[] = [];

  forEach(params, (value, key) => {
    if (value === null || typeof value === "undefined") {
      return;
    }

    let k = key;
    let v = value;
    if (Array.isArray(v)) {
      k += "[]";
    } else {
      v = [v];
    }

    forEach(v, (val) => {
      let finalValue = val;
      if (isObject(finalValue)) {
        finalValue = JSON.stringify(finalValue);
      }
      parts.push(`${k}=${finalValue}`);
    });
  });

  return parts.join("&");
};

export type HTTPLoaderConfig = {
  type: "HTTP";
  name: String;
  config: { endpoint: string };
};

export default class HttpDataLoader
  implements AmplifyAppSyncSimulatorDataLoader
{
  config: HTTPLoaderConfig["config"];
  constructor(httpConfig: HTTPLoaderConfig) {
    this.config = httpConfig.config;
  }

  async load(req: {
    resourcePath: any;
    params: { headers: any; query: any; body: any };
    method: string;
  }) {
    try {
      const { data, status, headers } = await axios.request({
        baseURL: this.config.endpoint,
        validateStatus: () => true,
        url: req.resourcePath,
        headers: req.params.headers,
        params: req.params.query,
        paramsSerializer,
        method: req.method.toLowerCase(),
        data: req.params.body,
      });

      return {
        headers,
        statusCode: status,
        body: JSON.stringify(data),
      };
    } catch (err) {
      console.log(err);
    }

    return null;
  }
}
