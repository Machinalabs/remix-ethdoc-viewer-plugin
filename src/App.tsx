import React, { useState, useEffect, useRef } from "react";

import {
  createIframeClient,
  CompilationFileSources,
  CompilationResult,
  Status,
} from "@remixproject/plugin";

import { AppContext } from "./AppContext";
import { Routes } from "./routes";

import "./App.css";

const devMode = { port: 8080 };

const defaultContent = `
    <style>
        #ethdoc-viewer{
            font-size: 0.8em;
            padding: 1em;
        }
        #ethdoc-viewer .lead{
            font-size: 1em;
        }
        #ethdoc-viewer table {
            width: 50%;
        }
        #ethdoc-viewer hr {
            margin: 0;
            margin-bottom: 0.5rem;
        }
        #ethdoc-viewer p{
            margin-bottom: 0.5rem;
        }
    </style>

    <div id="ethdoc-viewer">
      No contract to display
    </div>
`;

const App = () => {
  const [content, setContent] = useState(defaultContent);
  const [clientInstance, setClientInstance] = useState(undefined as any);
  const clientInstanceRef = useRef(clientInstance);
  clientInstanceRef.current = clientInstance;

  useEffect(() => {
    console.log("Remix Viewer loading...");
    const client = createIframeClient({ devMode });
    const loadClient = async () => {
      await client.onload();
      setClientInstance(client);
      console.log("Remix Viewer Plugin has been loaded");

      client.on(
        "ethdoc2" as any,
        "documentation-generated",
        (documentation: string) => {
          console.log("New Documentation Received", documentation);
          if (!documentation) {
            setContent(defaultContent);
          } else {
            setContent(documentation);
          }
        }
      );
    };

    loadClient();
  }, []);

  return (
    <AppContext.Provider
      value={{
        clientInstance,
        content,
        setContent,
      }}
    >
      <Routes />
    </AppContext.Provider>
  );
};

export default App;
