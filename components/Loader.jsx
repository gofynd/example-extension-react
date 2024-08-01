import React from "react";
import loaderGif from "../assets/loader.gif";
import "./loader.css";

export default function loader({ helperText }) {
  return (
    <div className="loader" data-testid="loader">
      <img src={loaderGif} alt="loader GIF" />
      {helperText && <div>{helperText}</div>}
    </div>
  );
}
