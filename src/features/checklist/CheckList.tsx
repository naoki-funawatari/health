import { useState } from "react";
import { useRecoilValue } from "recoil";
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

export default function CheckList() {
  const { year, month, dates, days } = useTaegetDate();
  const [selectedYear, setYear] = useState(year);
  const [selectedMonth, setMonth] = useState(month);
  useFetchConditions();
  useFetchEmployees();
  useFetchReports(selectedYear, selectedMonth);
  useFetchHolidaysByMonth(selectedYear, selectedMonth);
  const holidays = useRecoilValue(holidaysState);

  return (
    <div className="checklist">
      <MonthLabel {...{ selectedYear, selectedMonth, setYear, setMonth }} />
      <DateList {...{ days, dates, holidays }} />
      <Blank className="blank1" />
      <EmployeeList />
      <Grid {...{ year, month, dates }} />
      <Blank className="blank2" />
    </div>
  );
}
