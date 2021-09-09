import { Route, Switch } from 'react-router-dom';
import NewProduct from '../pages/products/NewProduct';
import Products from '../pages/products/Products';
import SearchProduct from '../pages/products/SearchProduct';

const ProductsRouter = () => {
    return (
        <Switch>
            <Route path="/products/new" component={NewProduct} />
            <Route path="/products/search" component={SearchProduct} />
            <Route exact path="/products" component={Products} />
        </Switch>
    )
}

export default ProductsRouter;
