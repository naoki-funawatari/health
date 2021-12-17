import { atom, useRecoilValue, useResetRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { defaultMonth, defaultYear, holidaysState } from "@/stores/stores";
import { useFetchHolidaysByYear, useDeleteHolidays } from "@/hooks/hooks";
import HolidayForm from "@/features/holidays/HolidayForm";
import HolidayRow from "@/features/holidays/HolidayRow";

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

export default function HolidayTable() {
  const { year } = useRecoilValue<IHolidayState>(holidayState);
  useFetchHolidaysByYear(year);
  const holidays = useRecoilValue(holidaysState);
  const deleteDialog = useRecoilValue(deleteDialogState);
  const resetDeleteDialog = useResetRecoilState(deleteDialogState);
  const { mutate } = useDeleteHolidays(year, deleteDialog.id);
  const handleDeleteClicked = () => {
    mutate();
    resetDeleteDialog();
  };
  const handleCancelClicked = () => resetDeleteDialog();

  return (
    <>
      <h2>祝祭日一覧</h2>
      <HolidayForm />
      <table className="holidays-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>名前</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {holidays.length ? (
            holidays.map(holiday => <HolidayRow key={`holidays-row-${holiday.id}`} {...holiday} />)
          ) : (
            <tr>
              <td colSpan={3}>
                <p>祝祭日はありません</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactModal {...{ isOpen: deleteDialog.isOpen, style }} contentLabel="Settings">
        <p>{deleteDialog.name} を削除します。</p>
        <div>
          <button onClick={handleDeleteClicked}>削除</button>
          <span>&nbsp;&nbsp;</span>
          <button onClick={handleCancelClicked}>キャンセル</button>
        </div>
      </ReactModal>
    </>
  );
}

export const deleteDialogState = atom({
  key: "deleteDialogState",
  default: {
    isOpen: false,
    id: -1,
    name: "",
  },
});

export interface IHolidayState {
  year: string;
  month: string;
  day: string;
  name: string;
}

export const holidayState = atom<IHolidayState>({
  key: "holidayState",
  default: {
    year: defaultYear,
    month: defaultMonth,
    day: "01",
    name: "",
  },
});
