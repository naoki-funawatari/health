import { useRecoilValue } from "recoil";
import { employeesState } from "@/stores/stores";
import Employee from "@/features/checklist/Employee";

const EmployeeList = () => {
  const employees = useRecoilValue(employeesState);

  return (
    <div className="employee-list-wrapper" id="employee-list-wrapper">
      <div id="employee-list">
        {employees.map(employee => (
          <Employee key={`employee-list-${employee.no}`} {...{ ...employee }} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
