import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp.jsx";
import "./main.css";


// container
const container = document.getElementById("root");

// create root
const root = ReactDOMClient.createRoot(container);

// initial render
root.render(<MyApp />);