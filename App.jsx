import React from "react";
import { Home } from "./pages/Home";

const globalStyles = `
  html {
    height: 100%;
    width: 100%;
    font-size: 8px;
  }

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f8f8f8 !important;
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }

  .root {
    font-family: 'Inter', sans-serif;
  }

  /* Common utility classes */
  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .mr-r-12 {
    margin-right: 12px;
  }

  .cl-RoyalBlue {
    color: #2e31be;
    margin-left: 2px;
  }

  .loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loader img {
    height: 100px;
  }
`;

function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="root">
        <Home />
      </div>
    </>
  );
}

export default App;
