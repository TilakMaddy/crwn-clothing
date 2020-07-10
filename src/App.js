import React from 'react';
import { HomePage } from './pages/homepage/homepage.component';
import { Route } from 'react-router-dom'


import './App.css';

const HatsPage = (props) => {

  console.log(props);

  return (
    <div>
      <h1>colored HATS</h1>
    </div>
  )
};

function App() {
  return (
    <div>
      <Route exact path='/' component={ HomePage }/>
      <Route path='/hats/' component={ HatsPage } />
    </div>
  );
}

export default App;
