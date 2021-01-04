import "./App.css";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
