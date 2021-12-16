import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { holidaysState } from "@/stores/stores";
import { useFetchHolidaysByYear, useTaegetDate } from "@/hooks/hooks";
import HolidayRow from "@/features/holidays/HolidayRow";

export default function HolidayTable() {
  const { year } = useTaegetDate();
  const years = [0, 1, 2].map(o => `${Number(year) + o}`);
  const [selectedYear, setYear] = useState(year);
  useFetchHolidaysByYear(selectedYear);
  const holidays = useRecoilValue(holidaysState);

  function handleYearChanged(event: React.ChangeEvent) {
    setYear((event.target as HTMLSelectElement).value);
  }

  return (
    <>
      <h2>祝祭日一覧</h2>
      <p>
        <select value={selectedYear} onChange={handleYearChanged}>
          {years.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span> 年 </span>
      </p>
      <table className="holidays-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>名前</th>
          </tr>
        </thead>
        <tbody>
          {holidays.length ? (
            holidays.map(holiday => <HolidayRow key={`holidays-row-${holiday.id}`} {...holiday} />)
          ) : (
            <tr>
              <td colSpan={2}>
                <p>祝祭日はありません</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
