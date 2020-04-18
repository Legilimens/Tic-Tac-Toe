import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import useRoutes from './routes';

function App() {
  const routes = useRoutes(false);
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
