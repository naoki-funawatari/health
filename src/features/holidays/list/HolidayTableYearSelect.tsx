import { useRecoilState } from "recoil";
import { holidayTableState } from "@/features/holidays/stores";
import { useYears } from "@/features/holidays/hooks";

export default function HolidayTableYearSelect() {
  const [holidayTable, setHolidayTable] = useRecoilState(holidayTableState);
  const years = useYears();
  const handleYearChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setHolidayTable({ year });
  };

  return (
    <p>
      <select value={holidayTable.year} onChange={handleYearChanged}>
        {years.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </p>
  );
}
