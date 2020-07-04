import React from "react";
import { AppContext } from "../AppContext";

export const HomeView: React.FC = () => {
  return (
    <AppContext.Consumer>
      {({ content }) => <div dangerouslySetInnerHTML={{ __html: content }} />}
    </AppContext.Consumer>
  );
};
