import Header from "./components/Header";
import Hero from "./components/Hero";
import Row from "./components/Row";
import Movie from "./components/Movie";
import requests from "./requests";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/movie/:id" component={Movie}></Route>
          <Route path="/">
            <Hero />
            <Row
              title="Netfilx Originals"
              fetchUrl={requests.fetchNetflixOriginals}
              isLargeRow
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row
              title="Romance Movies"
              fetchUrl={requests.fetchRomanceMovies}
            />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
