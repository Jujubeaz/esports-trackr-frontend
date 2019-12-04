import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import NotFound from '../components/NotFound/NotFound'

export default ({ currentUser, setCurrentUser }) => (
  <>
    <Switch>
      <Route exact path='/' render={() => <Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
      <Route path='/' component={NotFound} />
    </Switch>
  </>
)