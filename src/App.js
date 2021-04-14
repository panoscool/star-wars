import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Planets from './components/Planets';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Login />
      </Route>
      <Route path='/planets'>
        <Planets />
      </Route>
    </Switch>
  );
}

export default App;
