import { useRecoilValue, useResetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { IHoliday } from "@/interfaces/interfaces";
import { registerDialogState, newHolidayState } from "@/features/holidays/stores";
import { useRegisterHolidays } from "@/features/holidays/hooks";
import {
  FormYearSelect,
  FormMonthSelect,
  FormDaySelect,
  FormNameInput,
} from "@/features/holidays/HolidayFormParts";

export default function HolidayForm() {
  const holiday = useRecoilValue<IHoliday>(newHolidayState);
  const resetHoliday = useResetRecoilState(registerDialogState);
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
