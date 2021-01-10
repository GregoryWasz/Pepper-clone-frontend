import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import PostSearchBox from "./components/PostSearchBox";
import Register from "./components/Register";
import { UserContext } from "./components/UserContext";
import Cookies from "js-cookie";
import axios from "./service/axios";
import MyAccount from "./components/MyAccount";
import UserProfile from "./components/UserProfile";
const theme = createMuiTheme({
  palette: {
    primary: { main: "#111" },
    secondary: { main: "#ff7900" },
    background: {
      default: "#e9eaed",
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  async function getCookieValue() {
    await axios.get("/users/currentuser").then((response) => {
      setCurrentUserId(response.data.userId);
      setCurrentUsername(response.data.username);
    });
  }

  useEffect(() => {
    if (Cookies.get("JSESSIONID")) {
      setIsLoggedIn(true);
      getCookieValue();
    } else {
      setIsLoggedIn(false);
      setCurrentUserId("");
      setCurrentUsername("");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          currentUserId,
          setCurrentUserId,
          currentUsername,
          setCurrentUsername,
          getCookieValue,
        }}
      >
        <CssBaseline />
        <Router>
          <Header />
          <Container fixed>
            <Grid container>
              <Grid item xs={12} md={9}>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/posts/:id">
                    <PostDetails />
                  </Route>
                  <Route path="/register">
                    <Register />
                  </Route>
                  <Route path="/myaccount">
                    <MyAccount />
                  </Route>
                  <Route path="/profile/:id">
                    <UserProfile />
                  </Route>
                </Switch>
              </Grid>
              <Grid item xs={12} md={3}>
                <PostSearchBox />
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
