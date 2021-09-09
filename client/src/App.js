import AppRouter from "./router/Router";
import { HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <HelmetProvider>
      <AppRouter>  
      </AppRouter>
    </HelmetProvider>
  );
}

export default App;
