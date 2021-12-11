import React from "react";
import { IEmployee } from "@/apis/apis";

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
