import { useRecoilValue } from "recoil";
import { filteredHolidaysState } from "@/features/holidays/stores";
import HolidayTableRow from "@/features/holidays/list/HolidayTableRow";

export default function HolidayTableBody() {
  const holidays = useRecoilValue(filteredHolidaysState);

  return (
    <tbody>
      {holidays.length ? (
        holidays.map(holiday => <HolidayTableRow key={`holidays-row-${holiday.id}`} {...holiday} />)
      ) : (
        <tr>
          <td colSpan={3}>
            <p>祝祭日はありません</p>
          </td>
        </tr>
      )}
    </tbody>
  );
}
