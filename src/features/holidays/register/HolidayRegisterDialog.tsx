import { useRecoilValue, useResetRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IHoliday } from "@/interfaces/interfaces";
import { registerDialogInitailState, registerDialogState } from "@/features/holidays/stores";
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
  const { register, reset, handleSubmit } = useForm();
  const handleFormSubmitted: SubmitHandler<Inputs> = data => {
    const { year, month, day, name } = data;
    const holiday: IHoliday = {
      id: 0,
      date: `${year}/${month}/${day}`,
      name,
    };
    mutate(holiday);
    resetRegisterDialog();
    reset(registerDialogInitailState());
  };
  const handleCancelClicked = () => {
    resetRegisterDialog();
    reset(registerDialogInitailState());
  };

  return (
    <ReactModal {...{ isOpen: registerDialog.isOpen, style }} contentLabel="HolidayRegisterDialog">
      <h3>祝祭日登録</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmit(handleFormSubmitted)}>
        <FormYearSelect {...register("year", { required: true })} />
        <span>&nbsp;年&nbsp;</span>
        <FormMonthSelect {...register("month", { required: true })} />
        <span>&nbsp;月&nbsp;</span>
        <FormDaySelect {...register("day", { required: true })} />
        <span>&nbsp;日&nbsp;</span>
        <br />
        <br />
        <span>&nbsp;名前&nbsp;</span>
        <FormNameInput {...register("name", { required: true, maxLength: 20 })} />
        <br />
        <br />
        <input type="submit" value={"登録"} />
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleCancelClicked}>キャンセル</button>
      </form>
    </ReactModal>
  );
}
