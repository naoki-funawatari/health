import { useTaegetDate } from "@/hooks/hooks";

const jaWeekday = { 0: "日", 1: "月", 2: "火", 3: "水", 4: "木", 5: "金", 6: "土" };

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
              ({jaWeekday[o.format("d")]})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateList;
