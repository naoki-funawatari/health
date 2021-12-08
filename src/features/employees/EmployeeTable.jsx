import { useQuery } from "react-query";
import EmployeeRow from "@/features/employees/EmployeeRow";

const fetchEmployees = async () => {
  const res = await fetch("http://localhost:3001/api/v1/employees");
  return res.json();
};

const EmployeeTable = () => {
  const employees = useQuery("employees", fetchEmployees);

  if (employees.isLoading) {
    console.log("isLoading");
    return <h2>読み込み中...</h2>;
  }

  if (employees.error) console.log("error");

  if (employees.isFetching) console.log("isFetching");

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>部</th>
          <th>課</th>
          <th>職位</th>
          <th>社員番号</th>
          <th>氏名</th>
        </tr>
      </thead>
      <tbody>
        {employees.data.map(o => (
          <EmployeeRow key={`employee-row-${o.no}`} {...{ ...o }} />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
