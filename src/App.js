import { useSelector } from 'react-redux';
import Login from './components/Login';
import Planets from './components/Planets';
import { setAuth } from './store/actions';

function App() {
  const auth = useSelector((state) => state.auth);

  return <div>{auth ? <Planets /> : <Login setAuth={setAuth} />}</div>;
}

export default App;
