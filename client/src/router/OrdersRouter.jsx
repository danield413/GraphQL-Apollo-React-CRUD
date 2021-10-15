import { Route, Switch } from 'react-router-dom';
import NewOrder from '../pages/orders/NewOrder';
import Order from '../pages/orders/Order';
import Orders from '../pages/orders/Orders';
import SearchOrder from '../pages/orders/SearchOrder';

const OrdersRouter = () => {
    return (
        <Switch>
            <Route path="/orders/new" component={NewOrder} />
            <Route path="/orders/search" component={SearchOrder} />
            <Route path="/orders/:id" component={Order} />
            <Route exact path="/orders" component={Orders} />
        </Switch>
    )
}

export default OrdersRouter;
