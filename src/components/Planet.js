import _ from 'lodash';

function Planet({ planets }) {
  const max = Number(
    _.maxBy(planets, ({ population }) => (population === 'unknown' ? 0 : Number(population)))
      ?.population
  );
  const average = max / 2;
  const range = 0 - max;
  const relative = (range / average) * 100;
  const result = Math.abs(relative);
  console.log(result);

  return (
    <ul>
      {planets
        .sort((a, b) => b.population - a.population)
        .map((p) => (
          <li key={p.name}>
            <div>
              <dt className='text-xs'>Name</dt>
              <dd className='leading-6 font-medium text-black'>{p.name}</dd>
            </div>
            <div>
              <dt className='text-xs'>Population</dt>
              <dd className='text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4'>{p.population}</dd>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Planet;
