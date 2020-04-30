import React from 'react';
import { isAuthenticated } from './services/auth'

import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Main from './pages/main';
import Product from './pages/product';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

export default function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/product/:id" exact component={Product}/>
            </Switch>
        </BrowserRouter>
    );
}