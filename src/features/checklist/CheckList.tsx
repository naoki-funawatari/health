import {
  useTaegetDate,
  useFetchConditions,
  useFetchEmployees,
  useFetchReports,
} from "@/hooks/hooks";
import Blank from "@/components/Blank";
import MonthLabel from "@/features/checklist/MonthLabel";
import DateList from "@/features/checklist/DateList";
import EmployeeList from "@/features/checklist/EmployeeList";
import Grid from "@/features/checklist/grid/Grid";

const CheckList = () => {
  const { year, month, dates, days } = useTaegetDate();
  useFetchConditions();
  useFetchEmployees();
  useFetchReports(year, month);

  return (
    <div className="checklist">
      <MonthLabel {...{ month }} />
      <DateList {...{ days }} />
      <Blank className="blank1" />
      <EmployeeList />
      <Grid {...{ year, month, dates }} />
      <Blank className="blank2" />
    </div>
  );
};

export default CheckList;
