import { useRecoilValue } from "recoil";
import { holidaysState } from "@/stores/stores";
import HolidayRow from "@/features/holidays/HolidayRow";

export default function HolidayTable() {
  const holidays = useRecoilValue(holidaysState);

  return (
    <table className="holidays-table">
      <thead>
        <tr>
          <th>日付</th>
          <th>名前</th>
        </tr>
      </thead>
      <tbody>
        {holidays.length ? (
          holidays.map(holiday => <HolidayRow key={`holidays-row-${holiday.id}`} {...holiday} />)
        ) : (
          <tr>
            <td colSpan={2}>
              <p>祝祭日はありません</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
