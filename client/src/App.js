import React from 'react';
import AppNavbar from './components/AppNavbar';
import EventList from './components/EventList';
import { Container } from 'react-bootstrap';

import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <AppNavbar />
        <Container>
          <EventList />
        </Container>
      </React.Fragment>
    </Provider>
  );
}

export default App;
