import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
