import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { defaultYear, defaultMonth, defaultDay } from "@/stores/stores";
import { useYears, useMonths, useDays } from "@/features/holidays/hooks";

export const FormYearSelect = React.forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const years = useYears();

    return (
      <select {...props} ref={ref} defaultValue={defaultYear}>
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
    const months = useMonths();

    return (
      <select {...props} ref={ref} defaultValue={defaultMonth}>
        {months.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
);

type DayProps = UseFormRegisterReturn & {
  year: string;
  month: string;
};

export const FormDaySelect = React.forwardRef(
  (props: DayProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const { year, month } = props;
    const days = useDays(year, month);

    return (
      <select {...props} ref={ref} defaultValue={defaultDay}>
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
    return <input {...props} ref={ref} defaultValue={""} />;
  }
);
