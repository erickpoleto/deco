import React from 'react';
import { isAuthenticated } from './services/auth'

import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './pages/home';
import Product from './pages/product';

import Header from './components/Header/index'
import Footer from './components/Footer/index'

import LoginDeco from './pages/deco/login'
import DecoHome from './pages/deco/home'
import addProduct from './pages/deco/addProduct'
import addService from './pages/deco/addService'
import EditProduct from './pages/deco/editProduct';

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
                <Route path="/product/:id" component={Product}/>
                <Route path="/logindeco" component={LoginDeco}/>
                <PrivateRoute path="/decohome" component={DecoHome}/>
                <PrivateRoute path="/addproduct" component={addProduct}/>
                <PrivateRoute path="/addservice" component={addService}/>
                <PrivateRoute path="/editproduct/:id" component={EditProduct}/>
            </Switch>
            <Footer></Footer>
        </BrowserRouter>
    );
}