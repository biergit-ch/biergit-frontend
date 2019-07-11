import React from "react";
import { ReactComponent as Logo } from './images/loading.svg';

export default function Loading() {
  return (
    <div className="spinner">
      <Logo />
    </div>
  );
}
