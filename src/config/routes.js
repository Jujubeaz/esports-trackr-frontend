import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import League from '../components/League/League';
import Profile from '../components/Profile/Profile';
import Match from '../components/Match/Match';
import NotFound from '../components/NotFound/NotFound';

export default ({ currentUser, setCurrentUser, filter }) => (
  <>
    <Switch>
      <Route exact path='/' render={() => <Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
      <Route path="/league/:leagueId" render={() => <League filter={filter}/>} />
      <Route path="/team/:teamId" render={() => <Profile />} />
      <Route path="/match/:matchId" component={Match} />
      <Route path='/' component={NotFound} />
    </Switch>
  </>
)