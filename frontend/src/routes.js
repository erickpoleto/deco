import React from 'react';
import { isAuthenticated } from './services/auth'

import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './pages/home';
import Product from './pages/product';

import Header from './components/Header/index'
import Footer from './components/Footer/index'

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
            <Header></Header>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/product/:id" exact component={Product}/>
            </Switch>
            <Footer></Footer>
        </BrowserRouter>
    );
}