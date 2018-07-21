import * as React from "react"
import * as ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.hydrate(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root") as HTMLElement,
)
registerServiceWorker()
