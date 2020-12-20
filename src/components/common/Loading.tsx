import React from "react";
import { ReactComponent as Logo } from "./images/loading.svg";

const Loading: React.FC = () => {
  return (
    <div className="spinner">
      <Logo />
    </div>
  );
};
export default Loading;
