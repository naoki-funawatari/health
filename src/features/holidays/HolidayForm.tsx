import { useMemo, forwardRef } from "react";
import { atom, selector, useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { defaultYear, defaultMonth } from "@/stores/stores";
import { useRegisterHolidays } from "@/hooks/hooks";
import { IHolidays } from "@/interfaces/interfaces";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export default function HolidayForm() {
  const holiday = useRecoilValue<IHolidays>(newHolidayState);
  const resetHoliday = useResetRecoilState(holidayState);
  const { mutate } = useRegisterHolidays({ ...holiday, id: 0 });
  const { register, reset, handleSubmit } = useForm();
  const onSubmit = () => {
    mutate();
    reset();
    resetHoliday();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        <YearSelect {...register("year", { required: true })} />
        <span>&nbsp;年&nbsp;</span>
        <MonthSelect {...register("month", { required: true })} />
        <span>&nbsp;月&nbsp;</span>
        <DaySelect {...register("day", { required: true })} />
        <span>&nbsp;日&nbsp;</span>
        <span>&nbsp;名前&nbsp;</span>
        <NameInput {...register("name", { required: true, maxLength: 20 })} />
        <span>&nbsp;</span>
        <input type="submit" value={"登録"} />
      </p>
    </form>
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

function useDays(year: string, month: string) {
  return useMemo(() => {
    const tzDate = dayjs(`${year}/${month}/01`).tz();
    const tzEndtDate = tzDate.endOf("month");
    const endDay = Number(tzEndtDate.format("D"));

    return [...Array(endDay)].map((_, i) => `${i + 1}`.padStart(2, "0"));
  }, [year, month]);
}

interface IHolidayState {
  year: string;
  month: string;
  day: string;
  name: string;
}

const holidayState = atom<IHolidayState>({
  key: "holidayState",
  default: {
    year: defaultYear,
    month: defaultMonth,
    day: "01",
    name: "",
  },
});

const newHolidayState = selector<IHolidays>({
  key: "newHolidayState",
  get: ({ get }) => {
    const holiday = get(holidayState);
    const id = 0;
    const date = `${holiday.year}/${holiday.month}/${holiday.day}`;
    const name = holiday.name;

    return { id, date, name };
  },
});

const YearSelect = forwardRef(
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

const MonthSelect = forwardRef(
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

const DaySelect = forwardRef(
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

const NameInput = forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [holiday, setHoliday] = useRecoilState<IHolidayState>(holidayState);
    const handleNameChanged = (event: React.ChangeEvent) => {
      const name = (event.target as HTMLSelectElement).value;
      setHoliday(holiday => ({ ...holiday, name }));
    };

    return <input {...props} ref={ref} value={holiday.name} onChange={handleNameChanged} />;
  }
);
