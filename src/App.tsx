import React from 'react';
import Nav from './MainNavigator';
import {Provider} from 'react-redux';
import {store} from './reducer/store';

const App = () => {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
};

export default App;
