import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Planets from './components/Planets';
import { setAuth } from './store/actions';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  function handleAuth() {
    dispatch(setAuth(false));
  }

  return (
    <div>
      <button onClick={handleAuth}>Logout</button>
      {auth ? <Planets /> : <Login setAuth={setAuth} />}
    </div>
  );
}

export default App;
