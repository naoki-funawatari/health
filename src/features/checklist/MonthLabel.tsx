import { useRecoilState } from "recoil";
import { defaultYear, yearMonthState } from "@/stores/stores";
import { useFetchHolidaysByMonth, useFetchReports } from "@/hooks/hooks";

const MonthLabel = () => {
  const [{ year, month }, setYearMonth] = useRecoilState(yearMonthState);
  useFetchReports(year, month);
  useFetchHolidaysByMonth(year, month);
  const years = [0, 1, 2].map(o => `${Number(defaultYear) + o}`);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  function handleYearChanged(event: React.ChangeEvent) {
    const yearMonth = {
      year: (event.target as HTMLSelectElement).value,
      month,
    };

    setYearMonth(yearMonth);
  }

  function handleMonthChanged(event: React.ChangeEvent) {
    const yearMonth = {
      year,
      month: (event.target as HTMLSelectElement).value,
    };

    setYearMonth(yearMonth);
  }

  return (
    <div className="month-label">
      <div>
        <select value={year} onChange={handleYearChanged}>
          {years.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span> 年 </span>
        <select value={month} onChange={handleMonthChanged}>
          {months.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span> 月</span>
      </div>
    </div>
  );
};

export default MonthLabel;
