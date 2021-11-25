import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const jaWeekday = { 0: "日", 1: "月", 2: "火", 3: "水", 4: "木", 5: "金", 6: "土" };

const DateList = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");
  const startDate = dayjs().tz().startOf("month");
  const endDate = dayjs().tz().endOf("month");
  const endDay = Number(endDate.format("D"));
  const days = [...new Array(endDay).keys()].map((_, i) => startDate.add(i, "day"));

  return (
    <table>
      <tbody>
        <tr>
          {days.map(o => (
            <td>{o.format("D")}</td>
          ))}
        </tr>
        <tr>
          {days.map(o => (
            <td>({jaWeekday[o.format("d")]})</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default DateList;