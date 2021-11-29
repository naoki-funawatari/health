import { useEmployees } from "@/hooks/hooks";
import EmployeeRow from "@/features/employees/EmployeeRow";

const EmployeeTable = () => {
  const employees = useEmployees();

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
