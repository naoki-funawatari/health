import { useFetchConditions, useFetchEmployees } from "@/hooks/hooks";
import Blank from "@/components/Blank";
import MonthLabel from "@/features/checklist/MonthLabel";
import DateList from "@/features/checklist/DateList";
import EmployeeList from "@/features/checklist/EmployeeList";
import Grid from "@/features/checklist/grid/Grid";

export default function CheckList() {
  useFetchConditions();
  useFetchEmployees();

  return (
    <div className="checklist">
      <MonthLabel />
      <DateList />
      <Blank className="blank1" />
      <EmployeeList />
      <Grid />
      <Blank className="blank2" />
    </div>
  );
}
