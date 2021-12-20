import { forwardRef } from "react";
import { useRecoilState } from "recoil";
import { UseFormRegisterReturn } from "react-hook-form";
import { useYears, useMonths, useDays } from "@/features/holidays/hooks";
import { holidayState, IHolidayState } from "@/features/holidays/state";

export const YearSelect = forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const [holiday, setHoliday] = useRecoilState<IHolidayState>(holidayState);
    const years = useYears();
    const handleYearChanged = (event: React.ChangeEvent) => {
      const year = (event.target as HTMLSelectElement).value;
      setHoliday(holiday => ({ ...holiday, year, day: "01" }));
    };

    return (
      <select {...props} ref={ref} value={holiday.year} onChange={handleYearChanged}>
        {years.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
);

export const MonthSelect = forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const [holiday, setHoliday] = useRecoilState<IHolidayState>(holidayState);
    const months = useMonths();
    const handleMonthChanged = (event: React.ChangeEvent) => {
      const month = (event.target as HTMLSelectElement).value;
      setHoliday(holiday => ({ ...holiday, month, day: "01" }));
    };

    return (
      <select {...props} ref={ref} value={holiday.month} onChange={handleMonthChanged}>
        {months.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
);

export const DaySelect = forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const [holiday, setHoliday] = useRecoilState<IHolidayState>(holidayState);
    const days = useDays(holiday.year, holiday.month);
    const handleDayChanged = (event: React.ChangeEvent) => {
      const day = (event.target as HTMLSelectElement).value;
      setHoliday(holiday => ({ ...holiday, day }));
    };

    return (
      <select {...props} ref={ref} value={holiday.day} onChange={handleDayChanged}>
        {days.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
);

export const NameInput = forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [holiday, setHoliday] = useRecoilState<IHolidayState>(holidayState);
    const handleNameChanged = (event: React.ChangeEvent) => {
      const name = (event.target as HTMLSelectElement).value;
      setHoliday(holiday => ({ ...holiday, name }));
    };

    return <input {...props} ref={ref} value={holiday.name} onChange={handleNameChanged} />;
  }
);
