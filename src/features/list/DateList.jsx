import { useTaegetDate } from "@/hooks/hooks";

const jaWeekday = { 0: "日", 1: "月", 2: "火", 3: "水", 4: "木", 5: "金", 6: "土" };
const weekdayColor = {
  0: "red",
  1: "black",
  2: "black",
  3: "black",
  4: "black",
  5: "black",
  6: "blue",
};

const DateList = () => {
  const { month, days } = useTaegetDate();

  return (
    <div className="date-list-wrapper" id="date-list-wrapper">
      <div id="date-list">
        <h1>{month}月</h1>
        <div className="flex-row">
          {days.map((o, i) => (
            <div className="grid-item" key={`date-list-1-${i}`}>
              {o.format("D")}
            </div>
          ))}
        </div>
        <div className="flex-row">
          {days.map((o, i) => (
            <div className="grid-item" key={`date-list-2-${i}`}>
              <span>(</span>
              <span style={{ color: weekdayColor[o.format("d")] }}>{jaWeekday[o.format("d")]}</span>
              <span>)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateList;
