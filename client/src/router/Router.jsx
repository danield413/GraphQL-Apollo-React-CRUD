import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from '../components/Nav';
import ContextProvider from '../context/ContextProvider';
import Home from '../pages/Home';
import OrdersRouter from './OrdersRouter';
import ProductsRouter from './ProductsRouter';

const AppRouter = () => {
    return (
        <ContextProvider>
            <Router>
                <Nav />
                <Switch>
                    <Route path="/products" component={ProductsRouter} />
                    <Route path="/orders" component={OrdersRouter} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </ContextProvider>
    )
}

export default AppRouter;
