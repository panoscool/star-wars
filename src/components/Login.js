import { useState, useEffect } from 'react';
import useDebounce from '../useDebounce';
import apiRequest from '../api';

function Login({ setAuth }) {
  const [people, setPeople] = useState([]);
  const [state, setState] = useState({ username: '', password: '' });
  const debouncedSearchTerm = useDebounce(state.username, 200);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await apiRequest(`/people/?search=${debouncedSearchTerm}`);
        setPeople(res.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPeople();
  }, [debouncedSearchTerm]);

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const checkName = people[0]?.name === state.username;
    const checkAge = people[0]?.birth_year === state.password;
    if (checkName && checkAge) {
      setAuth(true);
    }
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
