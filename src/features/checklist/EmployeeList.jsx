import { useQuery } from "react-query";
import Employee from "@/features/checklist/Employee";

const fetchEmployees = async () => {
  const res = await fetch("http://localhost:3001/api/v1/employees");
  return res.json();
};

const EmployeeList = () => {
  const employees = useQuery("employees", fetchEmployees);

  if (employees.isLoading) {
    console.log("isLoading");
    return <h2>読み込み中...</h2>;
  }

  if (employees.error) console.log("error");

  if (employees.isFetching) console.log("isFetching");

  return (
    <div className="employee-list-wrapper" id="employee-list-wrapper">
      <div id="employee-list">
        {employees.data.map(o => (
          <Employee key={`employee-list-${o.no}`} {...{ ...o }} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
