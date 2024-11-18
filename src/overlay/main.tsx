import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ROOT_ID } from "../utils/constants";
import "./overlay.css";

const overlayCssUrl = chrome.runtime.getURL("overlay/overlay.css");

ReactDOM.createRoot(document.getElementById(ROOT_ID)!).render(
    <React.StrictMode>
        <link rel="stylesheet" type="text/css" href={overlayCssUrl} />
        <App />
    </React.StrictMode>
);
