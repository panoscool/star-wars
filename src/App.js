import { useState } from 'react';
import Login from './components/Login';
import Planets from './components/Planets';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <div>
      <button onClick={() => setAuth(false)}>Logout</button>
      {auth ? <Planets /> : <Login setAuth={setAuth} />}
    </div>
  );
}

export default App;
