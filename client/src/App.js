import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import useRoutes from './routes';
import { useAuth } from './hooks';

function App() {
  const { login, logout, token, userId } = useAuth();
  const routes = useRoutes(!!token);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {routes}
      </BrowserRouter>
    </div>
  );
}

export default App;
