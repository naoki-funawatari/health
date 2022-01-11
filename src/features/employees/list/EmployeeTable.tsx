import { useRecoilValue } from "recoil";
import { employeesState } from "@/stores/stores";
import { useFetchEmployees } from "@/hooks/hooks";
import EmployeeRow from "@/features/employees/list/EmployeeRow";

export default function EmployeeTable() {
  useFetchEmployees();
  const employees = useRecoilValue(employeesState);

  return (
    <>
      <h2>社員一覧</h2>
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
          {employees.map(employee => (
            <EmployeeRow key={`employee-row-${employee.no}`} {...{ ...employee }} />
          ))}
        </tbody>
      </table>
    </>
  );
}
