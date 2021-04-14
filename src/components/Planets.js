import { useEffect, useState } from 'react';
import Planet from './Planet';
import useDebounce from '../useDebounce';
import apiRequest from '../api';

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await apiRequest(`/planets/?search=${debouncedSearchTerm}`);
        setPlanets(res.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlanets();
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input autoComplete='off' onChange={(e) => setSearchTerm(e.target.value)} />
      <Planet planets={planets} />
    </div>
  );
}

export default Planets;
