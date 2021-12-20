import { useRecoilValue, useResetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useRegisterHolidays } from "@/hooks/hooks";
import { IHolidays } from "@/interfaces/interfaces";
import { holidayState, newHolidayState } from "@/features/holidays/stores";
import {
  FormYearSelect,
  FormMonthSelect,
  FormDaySelect,
  FormNameInput,
} from "@/features/holidays/HolidayFormParts";

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
        <FormYearSelect {...register("year", { required: true })} />
        <span>&nbsp;年&nbsp;</span>
        <FormMonthSelect {...register("month", { required: true })} />
        <span>&nbsp;月&nbsp;</span>
        <FormDaySelect {...register("day", { required: true })} />
        <span>&nbsp;日&nbsp;</span>
        <span>&nbsp;名前&nbsp;</span>
        <FormNameInput {...register("name", { required: true, maxLength: 20 })} />
        <span>&nbsp;</span>
        <input type="submit" value={"登録"} />
      </p>
    </form>
  );
}
