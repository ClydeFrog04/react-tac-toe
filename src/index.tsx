//@ts-nocheck
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import {StateContextProvider} from "./StateContext";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
    <StateContextProvider>
        <App/>
    </StateContextProvider>
);
/*
import React from "react";
//@ts-ignore
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import {StateContextProvider} from "./contexts/StateContext";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
    <StateContextProvider>
        <App/>
    </StateContextProvider>
);

 */
