import React from "react";
import { useRecoilState } from "recoil";
import { UseFormRegisterReturn } from "react-hook-form";
import { registerDialogState } from "@/features/holidays/stores";
import { useYears, useMonths, useDays } from "@/features/holidays/hooks";

export const FormYearSelect = React.forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const [holiday, setHoliday] = useRecoilState(registerDialogState);
    const years = useYears();
    const handleYearChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const year = event.target.value;
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

export const FormMonthSelect = React.forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const [holiday, setHoliday] = useRecoilState(registerDialogState);
    const months = useMonths();
    const handleMonthChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const month = event.target.value;
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

export const FormDaySelect = React.forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const [holiday, setHoliday] = useRecoilState(registerDialogState);
    const days = useDays(holiday.year, holiday.month);
    const handleDayChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const day = event.target.value;
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

export const FormNameInput = React.forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [holiday, setHoliday] = useRecoilState(registerDialogState);
    const handleNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;
      setHoliday(holiday => ({ ...holiday, name }));
    };

    return <input {...props} ref={ref} value={holiday.name} onChange={handleNameChanged} />;
  }
);
