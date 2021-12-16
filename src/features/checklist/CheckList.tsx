import { holidaysState } from "@/stores/stores";
import {
  useTaegetDate,
  useFetchConditions,
  useFetchEmployees,
  useFetchReports,
  useFetchHolidaysByMonth,
} from "@/hooks/hooks";
import Blank from "@/components/Blank";
import MonthLabel from "@/features/checklist/MonthLabel";
import DateList from "@/features/checklist/DateList";
import EmployeeList from "@/features/checklist/EmployeeList";
import Grid from "@/features/checklist/grid/Grid";
import { useRecoilValue } from "recoil";

export default function CheckList() {
  const { year, month, dates, days } = useTaegetDate();
  useFetchConditions();
  useFetchEmployees();
  useFetchReports(year, month);
  useFetchHolidaysByMonth(year, month);
  const holidays = useRecoilValue(holidaysState);

  return (
    <div className="checklist">
      <MonthLabel {...{ month }} />
      <DateList {...{ days, dates, holidays }} />
      <Blank className="blank1" />
      <EmployeeList />
      <Grid {...{ year, month, dates }} />
      <Blank className="blank2" />
    </div>
  );
}
