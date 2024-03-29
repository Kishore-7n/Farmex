import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store';
import { UserProvider } from './Context/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App/>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);

