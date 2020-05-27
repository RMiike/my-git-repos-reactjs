import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Main from '../pages/main'
import Repositorio from '../pages/repositorio'

const Routes = () => {
  console.log(process.env.REACT_APP_API_URL)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} /> 
        <Route exact path='/repositorio/:repositorio' component={Repositorio} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes; 