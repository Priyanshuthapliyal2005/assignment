import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Create the root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the app
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);

// Register the service worker
serviceWorkerRegistration.register();
