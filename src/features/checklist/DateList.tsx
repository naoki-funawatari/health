import { useRecoilValue } from "recoil";
import { dateListState } from "@/stores/stores";
import { holidaysState } from "@/features/holidays/stores";

interface IObjectAccessor {
  [key: string]: string;
}
const jaWeekday: IObjectAccessor = {
  "0": "日",
  "1": "月",
  "2": "火",
  "3": "水",
  "4": "木",
  "5": "金",
  "6": "土",
};
const weekdayColor: IObjectAccessor = {
  "0": "red",
  "1": "black",
  "2": "black",
  "3": "black",
  "4": "black",
  "5": "black",
  "6": "blue",
};

export default function DateList() {
  const dates = useRecoilValue(dateListState);
  const holidays = useRecoilValue(holidaysState);

  return (
    <div className="date-list-wrapper" id="date-list-wrapper">
      <div id="date-list">
        <div className="flex-row">
          {dates.map(o => (
            <div className="grid-item" key={`date-list-0-${o.value}`}>
              {o.day}
            </div>
          ))}
        </div>
        <div className="flex-row">
          {dates.map((o, i) => {
            const color = holidays.find(p => p.date === o.value) ? "red" : weekdayColor[o.weekday];
            const value = jaWeekday[o.weekday];

            return (
              <div className="grid-item" key={`date-list-2-${i}`}>
                <span>(</span>
                <span style={{ color }}>{value}</span>
                <span>)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
