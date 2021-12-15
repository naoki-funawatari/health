import React from "react";
import { IEmployee } from "@/interfaces/interfaces";

const EmployeeRow = React.memo((props: IEmployee) => {
  const { bu, ka, rank, no, name } = props;
  return (
    <tr>
      <td>{bu}</td>
      <td>{ka}</td>
      <td>{rank}</td>
      <td>{no}</td>
      <td>{name}</td>
    </tr>
  );
});

export default EmployeeRow;
