import Employee from "@/features/list/Employee";
import employees from "@/db/master/employees.json";

const EmployeeList = () => {
  return (
    <div>
      <table>
        <tbody>
          {employees.map(o => (
            <Employee {...{ ...o }} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
