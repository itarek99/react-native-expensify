import React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store from './redux/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
