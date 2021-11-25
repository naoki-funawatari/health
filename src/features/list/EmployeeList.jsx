import Employee from "@/features/list/Employee";
import employees from "@/db/master/employees.json";

const EmployeeList = () => {
  return (
    <div className="employee-list-wrapper" id="employee-list-wrapper">
      <div id="employee-list">
        <table>
          <tbody>
            {employees.map(o => (
              <Employee key={`employee-list-${o.no}`} {...{ ...o }} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
