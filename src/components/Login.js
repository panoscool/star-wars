import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../useDebounce';
import { getPeople, login } from '../store/actions';

function Login() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
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
    dispatch(login({ username, password }));
  }

  return (
    <div className='login'>
      <header className='header'>
        <img src='/logo.png' alt='star wars' className='logo' />
        {error && <div className='text-red-500 text-sm mb-3'>{error}</div>}
        <form
          autoComplete='off'
          onSubmit={handleSubmit}
          className='grid grid-flow-col grid-rows-3 grid-cols-1 gap-4'
        >
          <input
            className='text-gray-900'
            autoComplete='off'
            type='text'
            name='username'
            value={state.username}
            onChange={handleChange}
          />
          <input
            className='text-gray-900'
            autoComplete='off'
            type='password'
            name='password'
            value={state.password}
            onChange={handleChange}
          />
          <button
            type='submit'
            className='w-1/2 flex items-center justify-center rounded-md border border-gray-300'
          >
            Login
          </button>
        </form>
      </header>
    </div>
  );
}

export default Login;
