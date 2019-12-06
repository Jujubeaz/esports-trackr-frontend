import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import League from '../components/League/League';
import NotFound from '../components/NotFound/NotFound';

export default ({ currentUser, setCurrentUser, filter }) => (
  <>
    <Switch>
      <Route exact path='/' render={() => <Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
      <Route path="/league/:leagueId" render={() => <League filter={filter}/>} />
      <Route path='/' component={NotFound} />
    </Switch>
  </>
)