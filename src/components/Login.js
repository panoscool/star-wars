import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useDebounce from '../useDebounce';
import { getPeople, checkAuth } from '../store/actions';

function Login() {
  const dispatch = useDispatch();
  const [state, setState] = useState({ username: '', password: '' });
  const debouncedSearchTerm = useDebounce(state.username, 200);

  useEffect(() => {
    dispatch(getPeople(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = state;
    dispatch(checkAuth({ username, password }));
  }

  return (
    <div className='login'>
      <header className='header'>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <input
            autoComplete='off'
            type='text'
            name='username'
            value={state.username}
            onChange={handleChange}
          />
          <input
            autoComplete='off'
            type='password'
            name='password'
            value={state.password}
            onChange={handleChange}
          />
          <button type='submit'>Login</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
