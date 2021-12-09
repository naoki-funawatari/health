import { useCallback } from "react";
import { useTaegetDate } from "@/hooks/hooks";
import Blank from "@/components/Blank";
import MonthLabel from "@/features/checklist/MonthLabel";
import DateList from "@/features/checklist/DateList";
import EmployeeList from "@/features/checklist/EmployeeList";
import Grid from "@/features/checklist/Grid";

const CheckList = () => {
  const syncScroll = useCallback((e: React.UIEvent) => {
    const employeeListWrapper = document.getElementById("employee-list-wrapper") as HTMLDivElement;
    if (employeeListWrapper) {
      employeeListWrapper.scrollTop = (e.target as HTMLDivElement).scrollTop;
    }

    const dateListWrapper = document.getElementById("date-list-wrapper") as HTMLDivElement;
    if (dateListWrapper) {
      dateListWrapper.scrollLeft = (e.target as HTMLDivElement).scrollLeft;
    }
  }, []);
  const { year, month, days } = useTaegetDate();

  return (
    <div className="checklist">
      <MonthLabel {...{ month }} />
      <DateList {...{ days }} />
      <Blank className="blank1" />
      <EmployeeList />
      <Grid {...{ syncScroll, year, month, days }} />
      <Blank className="blank2" />
    </div>
  );
};
export default CheckList;
