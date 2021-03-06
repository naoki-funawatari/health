import { useSetRecoilState } from "recoil";
import { registerDialogState } from "@/features/holidays/stores";
import { useFetchHolidays } from "@/features/holidays/hooks";
import HolidayTableYearSelect from "@/features/holidays/list/HolidayTableYearSelect";
import HolidayTable from "@/features/holidays/list/HolidayTable";
import HolidayEditDialog from "@/features/holidays/edit/HolidayEditDialog";
import HolidayRegisterDialog from "@/features/holidays/register/HolidayRegisterDialog";

export default function Holidays() {
  useFetchHolidays();
  const setRegisterDialog = useSetRecoilState(registerDialogState);
  const handleRegisterClicked = () => setRegisterDialog(state => ({ ...state, isOpen: true }));

  return (
    <div className="holiday-table-wrap">
      <h2 className="holiday-table-title">祝祭日一覧</h2>
      <div className="holiday-table-select">
        <div>
          <HolidayTableYearSelect />
        </div>
        <div>
          <button onClick={handleRegisterClicked}>登録</button>
        </div>
      </div>
      <HolidayTable />
      <HolidayEditDialog />
      <HolidayRegisterDialog />
    </div>
  );
}
