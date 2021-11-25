const Employee = ({ bu, ka, no, rank, name }) => {
  return (
    <tr>
      <td>{bu}</td>
      <td>{ka}</td>
      <td>{no}</td>
      <td>{rank}</td>
      <td>{name}</td>
    </tr>
  );
};

export default Employee;
