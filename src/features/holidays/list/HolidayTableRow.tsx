import { useSetRecoilState } from "recoil";
import { IHoliday } from "@/interfaces/interfaces";
import { editDialogState } from "@/features/holidays/stores";

export default function HolidayTableRow({ id, date, name }: IHoliday) {
  const setEditDialog = useSetRecoilState(editDialogState);
  const handleEditClicked = () => setEditDialog({ isOpen: true, id, name });

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
