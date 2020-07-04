import React from "react";
import { PluginApi, IRemixApi, Api, PluginClient } from "@remixproject/plugin";

export const AppContext = React.createContext({
  clientInstance: {} as PluginApi<Readonly<IRemixApi>> &
    PluginClient<Api, Readonly<IRemixApi>>,
  content: "Nothing to display",
  setContent: (newContent: string) => {
    console.log("Calling Set Content");
  },
});
