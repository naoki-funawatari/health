import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import employees from "@/db/master/employees.json";
import conditions from "@/db/master/conditions.json";

const CheckList = ({ syncScroll }) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");
  const startDate = dayjs().tz().startOf("month");
  const endDate = dayjs().tz().endOf("month");
  const endDay = Number(endDate.format("D"));
  const days = [...new Array(endDay).keys()].map((_, i) => startDate.add(i, "day"));

  return (
    <div className="check-list-wrapper" onScroll={e => syncScroll(e)}>
      {employees.map(o => (
        <div className="flex-row" key={`check-list-${o.no}`}>
          {days.map((o, i) => (
            <div className="grid-item" key={`check-list-${o.no}-${i}`}>
              <select>
                {conditions.map((o, p) => (
                  <option key={`check-list-${o.no}-${p}`}>{o.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheckList;
