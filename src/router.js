import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Layout from './components/layout'
import Home from './pages/home'

class MRouter extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path='/' render={() => 
                            <Layout>
                                <Switch>
                                    <Route path='/home' exact component={Home}/>
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