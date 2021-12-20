import { useRecoilValue, useResetRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { useFetchHolidaysByYear, useDeleteHolidays } from "@/hooks/hooks";
import { deleteDialogState, holidayState, IHolidayState } from "@/features/holidays/state";

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

export default function HolidayDeleteDialog() {
  const { year } = useRecoilValue<IHolidayState>(holidayState);
  useFetchHolidaysByYear(year);
  const deleteDialog = useRecoilValue(deleteDialogState);
  const resetDeleteDialog = useResetRecoilState(deleteDialogState);
  const { mutate } = useDeleteHolidays(year, deleteDialog.id);
  const handleDeleteClicked = () => {
    mutate();
    resetDeleteDialog();
  };
  const handleCancelClicked = () => resetDeleteDialog();

  return (
    <ReactModal {...{ isOpen: deleteDialog.isOpen, style }} contentLabel="Settings">
      <p>{deleteDialog.name} を削除します。</p>
      <div>
        <button onClick={handleDeleteClicked}>削除</button>
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleCancelClicked}>キャンセル</button>
      </div>
    </ReactModal>
  );
}
