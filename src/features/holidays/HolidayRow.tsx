import { useSetRecoilState } from "recoil";
import { IHolidays } from "@/interfaces/interfaces";
import { deleteDialogState } from "@/features/holidays/state";

export default function HolidayRow({ id, date, name }: IHolidays) {
  const setDeleteDialog = useSetRecoilState(deleteDialogState);
  const handleEditClicked = () => setDeleteDialog({ isOpen: true, id, name });

  return (
    <tr>
      <td>{date}</td>
      <td>{name}</td>
      <td>
        <button onClick={handleEditClicked}>修正</button>
      </td>
    </tr>
  );
}
