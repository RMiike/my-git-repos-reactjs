import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Main from '../pages/main'
import Repositorio from '../pages/repositorio'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} /> 
        <Route exact path='/Repositorio' component={Repositorio} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes; 