import { useTaegetDate } from "@/hooks/hooks";

interface IMonthLabel {
  selectedYear: string;
  selectedMonth: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
}

const MonthLabel = (props: IMonthLabel) => {
  const { selectedYear, selectedMonth, setYear, setMonth } = props;
  const { year } = useTaegetDate();
  const years = [0, 1, 2].map(o => `${Number(year) + o}`);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  function handleYearChanged(event: React.ChangeEvent) {
    setYear((event.target as HTMLSelectElement).value);
  }

  function handleMonthChanged(event: React.ChangeEvent) {
    setMonth((event.target as HTMLSelectElement).value);
  }

  return (
    <div className="month-label">
      <div>
        <select value={selectedYear} onChange={handleYearChanged}>
          {years.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span> 年 </span>
        <select value={selectedMonth} onChange={handleMonthChanged}>
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
