import EmployeeRow from "@/features/employees/EmployeeRow";
import employees from "@/db/master/employees.json";

const EmployeeTable = () => (
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
      {employees.map(o => (
        <EmployeeRow key={`employee-row-${o.no}`} {...{ ...o }} />
      ))}
    </tbody>
  </table>
);

export default EmployeeTable;
