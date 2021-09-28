import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from '../components/Nav';
import ContextProvider from '../context/ContextProvider';
import Home from '../pages/Home';
import OrdersRouter from './OrdersRouter';
import ProductsRouter from './ProductsRouter';
import { Toaster } from 'react-hot-toast'

const AppRouter = () => {
    return (
        <ContextProvider>
            <Router>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 3000,
                style: {
                },
                // Default options for specific types
                success: {
                  duration: 3000,
                },
              }}
            />
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
