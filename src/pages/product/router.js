import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Product from '@pages/product/index'
import Category from '@pages/product/category'

const ProductRouter = () => {
    return (
        <Switch>
            <Route path='/product/index' component={Product}/>
            <Route path='/product-category/index' component={Category}/>
            <Redirect exact from='/product' to='/product/index'/>
            <Redirect exact from='/product-category' to='/product-category/index'/>
        </Switch>
    );
}

export default ProductRouter;