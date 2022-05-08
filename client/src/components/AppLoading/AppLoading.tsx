import React, { CSSProperties, Fragment } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./AppLoading.scss";

export default function AppLoading(props: {
  isLoading?: boolean;
  style?: CSSProperties;
  color?: string;
  size?: number;
}) {
  if (!props.isLoading) {
    return <Fragment />;
  }
  return (
    <div className="app-loading" style={props.style}>
      <ClipLoader
        size={props.size ? props.size : 50}
        color={props.color ? props.color : "white"}
      />
    </div>
  );
}
