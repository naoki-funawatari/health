import { useRecoilState, useResetRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { editDialogState } from "@/features/holidays/stores";
import { useUpdateHolidays, useDeleteHolidays } from "@/features/holidays/hooks";
import React from "react";

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
  const [eidtDialog, setEidtDialog] = useRecoilState(editDialogState);
  const resetEditDialog = useResetRecoilState(editDialogState);

  // 祝祭日名の入力
  const handleHolidayNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEidtDialog(val => ({ ...val, name: event.target.value }));
  };

  // 祝祭日の更新
  const { mutate: updateMutate } = useUpdateHolidays(eidtDialog.id, eidtDialog.name);
  const handleUpdateClicked = () => {
    updateMutate();
    resetEditDialog();
  };

  // 祝祭日の削除
  const { mutate: deleteMutate } = useDeleteHolidays(eidtDialog.id);
  const handleDeleteClicked = () => {
    deleteMutate();
    resetEditDialog();
  };

  // 修正のキャンセル
  const handleCancelClicked = () => resetEditDialog();

  return (
    <ReactModal {...{ isOpen: eidtDialog.isOpen, style }} contentLabel="HolidayEditDialog">
      <h3>祝祭日修正</h3>
      <hr />
      <div>
        <label>
          名前：
          <input type="text" value={eidtDialog.name} onChange={handleHolidayNameChanged} />
        </label>
      </div>
      <br />
      <div>
        <button onClick={handleUpdateClicked}>更新</button>
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleDeleteClicked}>削除</button>
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleCancelClicked}>キャンセル</button>
      </div>
    </ReactModal>
  );
}
