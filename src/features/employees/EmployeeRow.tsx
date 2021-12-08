const EmployeeRow = ({
  bu,
  ka,
  rank,
  no,
  name,
}: {
  bu: string;
  ka: string;
  rank: string;
  no: string;
  name: string;
}) => (
  <tr>
    <td>{bu}</td>
    <td>{ka}</td>
    <td>{rank}</td>
    <td>{no}</td>
    <td>{name}</td>
  </tr>
);

export default EmployeeRow;
