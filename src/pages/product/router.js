import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Product from '@pages/product/index'
import Category from '@pages/product/category'
import ProductDetail from '@pages/product/index/detail'
import ProductSave from '@pages/product/index/save'

const ProductRouter = () => {
    return (
        <Switch>
            <Route path='/product/index' component={Product}/>
            <Route path='/product-category/index' component={Category}/>
            <Route path='/product/detail/:id' component={ProductDetail}/>
            <Route path='/product/save/:id' component={ProductSave}/>
            <Redirect exact from='/product' to='/product/index'/>
            <Redirect exact from='/product-category' to='/product-category/index'/>
        </Switch>
    );
}

export default ProductRouter;