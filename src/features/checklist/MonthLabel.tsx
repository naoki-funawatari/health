import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultYear, reportDateState } from "@/stores/stores";
import { useFetchHolidaysByMonth, useFetchReports } from "@/hooks/hooks";

export default function MonthLabel() {
  const { year, month } = useRecoilValue(reportDateState);
  useFetchReports(year, month);
  useFetchHolidaysByMonth(year, month);

  return (
    <div className="month-label">
      <div>
        <YearSelect />
        <span>&nbsp;年&nbsp;</span>
        <MonthSelect />
        <span>&nbsp;月</span>
      </div>
    </div>
  );
}

function YearSelect() {
  const [reportDate, setReportDate] = useRecoilState(reportDateState);
  const years = useYears();
  const handleYearChanged = (event: React.ChangeEvent) => {
    const year = (event.target as HTMLSelectElement).value;
    setReportDate(reportDate => ({ ...reportDate, year }));
  };

  return (
    <select value={reportDate.year} onChange={handleYearChanged}>
      {years.map(o => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function MonthSelect() {
  const [reportDate, setReportDate] = useRecoilState(reportDateState);
  const months = useMonths();
  const handleMonthChanged = (event: React.ChangeEvent) => {
    const month = (event.target as HTMLSelectElement).value;
    setReportDate(reportDate => ({ ...reportDate, month }));
  };

  return (
    <select value={reportDate.month} onChange={handleMonthChanged}>
      {months.map(o => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function useYears() {
  return useMemo(() => {
    return [0, 1, 2].map(o => `${Number(defaultYear) + o}`);
  }, []);
}

function useMonths() {
  return useMemo(() => {
    return [...Array(12)].map((_, i) => `${i + 1}`.padStart(2, "0"));
  }, []);
}
