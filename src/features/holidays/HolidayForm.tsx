import { useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { yearMonthState, defaultYear, defaultMonth } from "@/stores/stores";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

interface IHolidayForm {
  month: string;
  day: string;
  name: string;
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

export default function HolidayForm() {
  const [{ year }, setYearMonth] = useRecoilState(yearMonthState);
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("01");
  const [name, setName] = useState("");
  const years = useYears();
  const months = useMonths();
  const days = useDays(year, month);
  const { register, handleSubmit } = useForm();

  function onSubmit(data: IHolidayForm) {
    console.log(data);

    setMonth("01");
    setDay("01");
    setName("");
  }

  function handleYearChanged(event: React.ChangeEvent) {
    const yearMonth = {
      year: (event.target as HTMLSelectElement).value,
      month: defaultMonth,
    };

    setYearMonth(yearMonth);
    setMonth("01");
    setDay("01");
  }

  function handleMonthChanged(event: React.ChangeEvent) {
    setMonth((event.target as HTMLSelectElement).value);
    setDay("01");
  }

  function handleDayChanged(event: React.ChangeEvent) {
    setDay((event.target as HTMLSelectElement).value);
  }

  function handleNameChanged(event: React.ChangeEvent) {
    setName((event.target as HTMLSelectElement).value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        <select value={year} onChange={handleYearChanged}>
          {years.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span> 年 </span>
        <select {...register("month")} value={month} onChange={handleMonthChanged}>
          {months.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span> 月 </span>
        <select {...register("day")} value={day} onChange={handleDayChanged}>
          {days.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span> 日&nbsp;&nbsp;名前 </span>
        <input
          {...register("name", { required: true, maxLength: 20 })}
          value={name}
          onChange={handleNameChanged}
        />
        <span>&nbsp;</span>
        <input type="submit" value={"登録"} />
      </p>
    </form>
  );
}
