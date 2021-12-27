import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IHoliday } from "@/interfaces/interfaces";
import { editDialogState } from "@/features/holidays/stores";
import { useUpdateHolidays, useDeleteHolidays } from "@/features/holidays/hooks";
import { FormNameInput } from "@/features/holidays/edit/HolidayEditParts";

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

export default function HolidayEditDialog() {
  const eidtDialog = useRecoilValue(editDialogState);
  const resetEditDialog = useResetRecoilState(editDialogState);
  const { register, reset, handleSubmit, setValue, getValues } = useForm({
    defaultValues: { name: "" },
  });

  useEffect(() => {
    setValue("name", eidtDialog.name);
  }, [setValue, eidtDialog]);

  // 祝祭日の更新
  const { mutate: updateMutate } = useUpdateHolidays();
  const handleFormSubmitted: SubmitHandler<{}> = () => {
    const holiday: IHoliday = {
      id: eidtDialog.id,
      date: "",
      name: getValues("name"),
    };
    updateMutate(holiday);
    resetEditDialog();
    reset();
  };

  // 祝祭日の削除
  const { mutate: deleteMutate } = useDeleteHolidays();
  const handleDeleteClicked = () => {
    const holiday: IHoliday = {
      id: eidtDialog.id,
      date: "",
      name: "",
    };
    deleteMutate(holiday);
    resetEditDialog();
    reset();
  };

  // 修正のキャンセル
  const handleCancelClicked = () => resetEditDialog();

  return (
    <ReactModal {...{ isOpen: eidtDialog.isOpen, style }} contentLabel="HolidayEditDialog">
      <h3>祝祭日修正</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmit(handleFormSubmitted)}>
        <span>&nbsp;名前&nbsp;</span>
        <FormNameInput {...register("name", { required: true, maxLength: 20 })} />
        <br />
        <br />
        <input type="submit" value={"更新"} />
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleDeleteClicked}>削除</button>
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleCancelClicked}>キャンセル</button>
      </form>
    </ReactModal>
  );
}
