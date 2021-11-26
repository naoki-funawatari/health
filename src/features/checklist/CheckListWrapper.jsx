import { useCallback } from "react";
import Blank from "@/features/checklist/Blank";
import DateList from "@/features/checklist/DateList";
import EmployeeList from "@/features/checklist/EmployeeList";
import CheckList from "@/features/checklist/CheckList";

const CheckListWrapper = () => {
  const syncScroll = useCallback(e => {
    document.getElementById("employee-list-wrapper").scrollTop = e.target.scrollTop;
    document.getElementById("date-list-wrapper").scrollLeft = e.target.scrollLeft;
  }, []);

  return (
    <div className="checklist">
      <Blank className="blank1" />
      <DateList />
      <Blank className="blank2" />
      <EmployeeList />
      <CheckList {...{ syncScroll }} />
      <Blank className="blank3" />
    </div>
  );
};
export default CheckListWrapper;
