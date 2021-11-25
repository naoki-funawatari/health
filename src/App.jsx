import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import DateList from "@/features/list/DateList";
import EmployeeList from "@/features/list/EmployeeList";

const App = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");
  const month = Number(dayjs().tz().endOf("month").format("M"));

  return (
    <>
      <h1>{month}月</h1>
      <DateList />
      <EmployeeList />
    </>
  );
};

export default App;
