import "./App.css";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Users></Users>
        <Posts></Posts>
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
