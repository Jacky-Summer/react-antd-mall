import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import ProductRouter from '@pages/product/router.js'
import Layout from '@components/layout'
import Home from '@pages/home'
import Login from '@pages/login'

class MRouter extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/' render={() => 
                            <Layout>
                                <Switch>
                                    <Route path='/home' exact component={Home}/>
                                    <Route path='/product' component={ProductRouter}/>
                                    <Route path='/product-category' component={ProductRouter}/>
                                    <Redirect exact from="/" to='/home'/>
                                </Switch>
                            </Layout>  
                        }/>
                    </Switch>
                </App>
            </Router>
        );
    }
}

export default MRouter;