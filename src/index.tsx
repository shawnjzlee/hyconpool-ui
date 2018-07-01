import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement,
)
registerServiceWorker()
