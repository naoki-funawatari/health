import Employee from "@/features/checklist/Employee";
import employees from "@/db/master/employees.json";

const EmployeeList = () => {
  return (
    <div className="employee-list-wrapper" id="employee-list-wrapper">
      <div id="employee-list">
        {employees.map(o => (
          <Employee key={`employee-list-${o.no}`} {...{ ...o }} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
