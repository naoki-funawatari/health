import { useRecoilState, useRecoilValue } from "recoil";
import { holidayTableState, filteredHolidaysState } from "@/features/holidays/stores";
import { useYears } from "@/features/holidays/hooks";
import HolidayRow from "@/features/holidays/HolidayRow";
import HolidayEditDialog from "@/features/holidays/HolidayEditDialog";

export default function HolidayTable() {
  const holidays = useRecoilValue(filteredHolidaysState);

  return (
    <>
      <h2>祝祭日一覧</h2>
      <p>
        <TableYearSelect />
      </p>
      <table className="holidays-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>名前</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {holidays.length ? (
            holidays.map(holiday => <HolidayRow key={`holidays-row-${holiday.id}`} {...holiday} />)
          ) : (
            <tr>
              <td colSpan={3}>
                <p>祝祭日はありません</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <HolidayEditDialog />
    </>
  );
}

export function TableYearSelect() {
  const [holidayTable, setHolidayTable] = useRecoilState(holidayTableState);
  const years = useYears();
  const handleYearChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setHolidayTable(holidayTable => ({ ...holidayTable, year, day: "01" }));
  };

  return (
    <select value={holidayTable.year} onChange={handleYearChanged}>
      {years.map(o => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
