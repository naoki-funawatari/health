import { useCallback } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { defaultYear, defaultMonth, defaultDay } from "@/stores/stores";
import { IHoliday } from "@/interfaces/interfaces";
import { registerDialogState } from "@/features/holidays/stores";
import { useRegisterHoliday } from "@/features/holidays/hooks";
import {
  FormYearSelect,
  FormMonthSelect,
  FormDaySelect,
  FormNameInput,
} from "@/features/holidays/register/HolidayRegisterParts";

const style: Styles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "static",
    inset: "auto",
  },
};

interface Inputs {
  year: string;
  month: string;
  day: string;
  name: string;
}

export default function HolidayRegisterDialog() {
  const registerDialog = useRecoilValue(registerDialogState);
  const resetRegisterDialog = useResetRecoilState(registerDialogState);
  const { mutate } = useRegisterHoliday();
  const { register, reset, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      year: defaultYear,
      month: defaultMonth,
      day: defaultDay,
      name: "",
    },
  });
  const handleFormSubmitted: SubmitHandler<Inputs> = data => {
    const { year, month, day, name } = data;
    const holiday: IHoliday = {
      id: 0,
      date: `${year}/${month}/${day}`,
      name,
    };
    mutate(holiday);
    resetRegisterDialog();
    reset();
  };
  const handleCancelClicked = useCallback(() => {
    resetRegisterDialog();
    reset();
  }, [resetRegisterDialog, reset]);
  const handleYearChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("year", event.target.value);
    setValue("day", "01");
  };
  const handleMonthChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("month", event.target.value);
    setValue("day", "01");
  };
  const handleDayChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("day", event.target.value);
  };

  return (
    <ReactModal {...{ isOpen: registerDialog.isOpen, style }} contentLabel="HolidayRegisterDialog">
      <h3>???????????????</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmit(handleFormSubmitted)}>
        <FormYearSelect {...register("year", { required: true, onChange: handleYearChanged })} />
        <span>&nbsp;???&nbsp;</span>
        <FormMonthSelect {...register("month", { required: true, onChange: handleMonthChanged })} />
        <span>&nbsp;???&nbsp;</span>
        <FormDaySelect
          {...{ year: watch("year"), month: watch("month") }}
          {...register("day", { required: true, onChange: handleDayChanged })}
        />
        <span>&nbsp;???&nbsp;</span>
        <br />
        <br />
        <span>&nbsp;??????&nbsp;</span>
        <FormNameInput {...register("name", { required: true, maxLength: 20 })} />
        <br />
        <br />
        <input type="submit" value={"??????"} />
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleCancelClicked}>???????????????</button>
      </form>
    </ReactModal>
  );
}
