import { useSyncScroll, useTaegetDate } from "@/hooks/hooks";
import Blank from "@/components/Blank";
import MonthLabel from "@/features/checklist/MonthLabel";
import DateList from "@/features/checklist/DateList";
import EmployeeList from "@/features/checklist/EmployeeList";
import Grid from "@/features/checklist/grid/Grid";

const CheckList = () => {
  const syncScroll = useSyncScroll();
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
