import { IHolidays } from "@/interfaces/interfaces";
import { Dayjs } from "dayjs";

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

interface IDateList {
  days: Dayjs[];
  dates: string[];
  holidays: IHolidays[];
}

export default function DateList(props: IDateList) {
  const { days, dates, holidays } = props;
  return (
    <div className="date-list-wrapper" id="date-list-wrapper">
      <div id="date-list">
        <div className="flex-row">
          {days.map((o, i) => (
            <div className="grid-item" key={`date-list-1-${i}`}>
              {o.format("D")}
            </div>
          ))}
        </div>
        <div className="flex-row">
          {days.map((o, i) => {
            const color = holidays.find(o => o.date === dates[i])
              ? "red"
              : weekdayColor[o.format("d")];
            return (
              <div className="grid-item" key={`date-list-2-${i}`}>
                <span>(</span>
                <span style={{ color }}>{jaWeekday[o.format("d")]}</span>
                <span>)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
