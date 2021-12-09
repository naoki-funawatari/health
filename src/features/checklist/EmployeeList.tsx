import { useEmployees } from "@/hooks/hooks";
import Employee from "@/features/checklist/Employee";

const EmployeeList = () => {
  const employees = useEmployees();

  if (employees.isLoading) {
    return <h2>読み込み中...</h2>;
  }

  if (employees.error) console.log("error");

  return (
    <div className="employee-list-wrapper" id="employee-list-wrapper">
      <div id="employee-list">
        {employees.data?.map(o => (
          <Employee key={`employee-list-${o.no}`} {...{ ...o }} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
