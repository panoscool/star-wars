import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Planet from './Planet';
import useDebounce from '../useDebounce';
import { getPlanets, logout } from '../store/actions';

function Planets() {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.people);
  const planets = useSelector((state) => state.planets);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    dispatch(getPlanets(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  function handleAuth() {
    dispatch(logout());
  }

  return (
    <div className='container mx-auto py-4'>
      <h3 className='text-center'>{person?.name}</h3>
      <div className='px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4'>
        <header className='flex items-center justify-between'>
          <h2 className='text-lg leading-6 font-medium text-black'>Planets</h2>
          <button
            className='hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2'
            onClick={handleAuth}
          >
            Logout
          </button>
        </header>
        <form className='relative'>
          <svg
            width='20'
            height='20'
            fill='currentColor'
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            />
          </svg>
          <input
            autoComplete='off'
            className='focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10'
            type='text'
            aria-label='Search planets'
            placeholder='Search planets'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <Planet planets={planets} />
      </div>
    </div>
  );
}

export default Planets;
