function Planet({ planets }) {
  return (
    <ul>
      {planets?.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  );
}

export default Planet;
