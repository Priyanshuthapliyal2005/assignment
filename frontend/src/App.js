import "./App.css";
import Homepage from "./Pages/HomePage";
import Chatpage from "./Pages/ChatPage";
import ErrorPage  from "./Pages/ErrorPage";   
import { BrowserRouter as Router, Route, Redirect, useLocation  } from "react-router-dom";

function App() {
  const location = useLocation();

  const validPaths = ['/', '/chats'];
  const isValidPath = validPaths.includes(location.pathname);
  return (
    <div className="App">
        <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />

      {!isValidPath && <Redirect to="/error" />}
      <Route path="/error" component={ErrorPage} />
    </div>
  );
}
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
