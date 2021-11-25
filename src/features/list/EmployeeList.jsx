import Employee from "@/features/list/Employee";
import employees from "@/db/master/employees.json";

const EmployeeList = () => {
  return (
    <table>
      <tbody>
        {employees.map(o => (
          <Employee {...{ ...o }} />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
