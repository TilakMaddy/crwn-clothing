import React from 'react';
import { HomePage } from './pages/homepage/homepage.component';
import { Route } from 'react-router-dom'
// import { Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'


import './App.css';

const HatsPage = (props) => {

  console.log(props);

  return (
    <div>
      <Link to={`/hats/${Math.floor(Math.random()*200)}`}> Random Hats </Link>
      <h1> { props.match.params.color } colored HATS</h1>
    </div>
  )
};

function App() {
  return (
    <div>
      {/* <HomePage /> */}
      {/* <Switch> */}
        <Route exact path='/' component={ HomePage }/>
        <Route path='/hats/:color' component={ HatsPage } />
      {/* </Switch> */}
    </div>
  );
}

export default App;
