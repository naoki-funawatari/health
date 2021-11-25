import { useCallback } from "react";
import Blank from "@/features/list/Blank";
import DateList from "@/features/list/DateList";
import EmployeeList from "@/features/list/EmployeeList";
import CheckList from "@/features/list/CheckList";

const App = () => {
  const syncScroll = useCallback(e => {
    document.getElementById("employee-list-wrapper").scrollTop = e.target.scrollTop;
    document.getElementById("date-list-wrapper").scrollLeft = e.target.scrollLeft;
  }, []);

  return (
    <>
      <Blank className="blank1" />
      <DateList />
      <Blank className="blank2" />
      <EmployeeList />
      <CheckList {...{ syncScroll }} />
      <Blank className="blank3" />
    </>
  );
};

export default App;
