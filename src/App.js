import "./App.css";
import Users from "./components/Users";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import Role from "./components/Role";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import PostSearchBox from "./components/PostSearchBox";

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
  return (
    <ThemeProvider theme={theme}>
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
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/posts/:id">
                  <PostDetails />
                </Route>
                <Route path="/role">
                  <Role />
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
    </ThemeProvider>
  );
}

export default App;
