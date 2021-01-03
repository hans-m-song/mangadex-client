import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Chapter from './components/Chapter';
import Home from './components/Home';
import Manga from './components/Manga';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/manga/:id" component={Manga} />
          <Route path="/chapter/:id" component={Chapter} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
