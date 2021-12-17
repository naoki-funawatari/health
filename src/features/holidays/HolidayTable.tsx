import { atom, useRecoilValue } from "recoil";
import { defaultMonth, defaultYear, holidaysState } from "@/stores/stores";
import { useFetchHolidaysByYear } from "@/hooks/hooks";
import HolidayForm from "@/features/holidays/HolidayForm";
import HolidayRow from "@/features/holidays/HolidayRow";

export default function HolidayTable() {
  const { year } = useRecoilValue<IHolidayState>(holidayState);
  useFetchHolidaysByYear(year);
  const holidays = useRecoilValue(holidaysState);

  return (
    <>
      <h2>祝祭日一覧</h2>
      <HolidayForm />
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
    </>
  );
}

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
