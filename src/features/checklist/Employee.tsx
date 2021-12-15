import { IEmployee } from "@/interfaces/interfaces";

const Employee = (props: IEmployee) => {
  const { bu, no, name } = props;
  return (
    <div className="flex-row">
      <div className="employee-item bu">{bu}</div>
      <div className="employee-item no">{no}</div>
      <div className="employee-item name">{name}</div>
    </div>
  );
};

export default Employee;
