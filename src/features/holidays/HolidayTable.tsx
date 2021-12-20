import { useRecoilValue } from "recoil";
import { holidaysState } from "@/stores/stores";
import { useFetchHolidaysByYear } from "@/hooks/hooks";
import { holidayState, IHolidayState } from "@/features/holidays/state";
import HolidayRow from "@/features/holidays/HolidayRow";
import HolidayDeleteDialog from "@/features/holidays/HolidayDeleteDialog";

export default function HolidayTable() {
  const { year } = useRecoilValue<IHolidayState>(holidayState);
  useFetchHolidaysByYear(year);
  const holidays = useRecoilValue(holidaysState);

  return (
    <>
      <h2>祝祭日一覧</h2>
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
      <HolidayDeleteDialog />
    </>
  );
}
