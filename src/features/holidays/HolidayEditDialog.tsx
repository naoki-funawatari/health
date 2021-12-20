import { useRecoilValue, useResetRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { editDialogState } from "@/features/holidays/stores";
import { useDeleteHolidays } from "@/features/holidays/hooks";

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
  const { mutate } = useDeleteHolidays(eidtDialog.id);
  const handleEditClicked = () => {
    mutate();
    resetEditDialog();
  };
  const handleCancelClicked = () => resetEditDialog();

  return (
    <ReactModal {...{ isOpen: eidtDialog.isOpen, style }} contentLabel="HolidayEditDialog">
      <h3>祝祭日修正</h3>
      <hr />
      <p>{eidtDialog.name} を削除します。</p>
      <div>
        <button onClick={handleEditClicked}>削除</button>
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleCancelClicked}>キャンセル</button>
      </div>
    </ReactModal>
  );
}
