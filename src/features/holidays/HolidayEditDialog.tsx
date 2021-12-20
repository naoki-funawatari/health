import { useRecoilValue, useResetRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { useFetchHolidaysByYear, useDeleteHolidays } from "@/hooks/hooks";
import { editDialogState, holidayState, IHolidayState } from "@/features/holidays/state";

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
  const { year } = useRecoilValue<IHolidayState>(holidayState);
  useFetchHolidaysByYear(year);
  const eidtDialog = useRecoilValue(editDialogState);
  const resetEditDialog = useResetRecoilState(editDialogState);
  const { mutate } = useDeleteHolidays(year, eidtDialog.id);
  const handleEditClicked = () => {
    mutate();
    resetEditDialog();
  };
  const handleCancelClicked = () => resetEditDialog();

  return (
    <ReactModal {...{ isOpen: eidtDialog.isOpen, style }} contentLabel="Settings">
      <p>{eidtDialog.name} を削除します。</p>
      <div>
        <button onClick={handleEditClicked}>削除</button>
        <span>&nbsp;&nbsp;</span>
        <button onClick={handleCancelClicked}>キャンセル</button>
      </div>
    </ReactModal>
  );
}
