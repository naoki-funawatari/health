import { useCallback } from "react";
import Blank from "@/components/Blank";
import MonthLabel from "@/features/checklist/MonthLabel";
import DateList from "@/features/checklist/DateList";
import EmployeeList from "@/features/checklist/EmployeeList";
import Grid from "@/features/checklist/Grid";
import { useTaegetDate } from "@/hooks/hooks";

const CheckList = () => {
  const syncScroll = useCallback(e => {
    document.getElementById("employee-list-wrapper").scrollTop = e.target.scrollTop;
    document.getElementById("date-list-wrapper").scrollLeft = e.target.scrollLeft;
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
