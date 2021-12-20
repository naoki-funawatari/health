import { useSetRecoilState } from "recoil";
import { IHolidays } from "@/interfaces/interfaces";
import { deleteDialogState } from "@/features/holidays/state";

export default function HolidayRow({ id, date, name }: IHolidays) {
  const setDeleteDialog = useSetRecoilState(deleteDialogState);
  const handleDeleteClicked = () => setDeleteDialog({ isOpen: true, id, name });

  return (
    <tr>
      <td>{date}</td>
      <td>{name}</td>
      <td>
        <button onClick={handleDeleteClicked}>削除</button>
      </td>
    </tr>
  );
}
