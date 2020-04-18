import React from 'react'
import { Switch, Route, Redirect } from  'react-router-dom';
import Auth from './pages/Auth';
import GameList from './pages/GameList'
import Game from './pages/Game';
import Profile from './pages/Profile'

function useRoutes(isAuthenticated) {
  return (
    <Switch>
      {isAuthenticated && (
        <Route path="/profile" exact>
          <Profile />
        </Route>
      )}
    
      <Route path="/" exact>
        <GameList />
      </Route>
      <Route path="/game/:id">
        <Game />
      </Route>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default useRoutes;
