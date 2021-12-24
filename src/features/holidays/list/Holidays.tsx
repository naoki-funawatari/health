import { useFetchHolidays } from "@/features/holidays/hooks";
import HolidayTableYearSelect from "@/features/holidays/list/HolidayTableYearSelect";
import HolidayTable from "@/features/holidays/list/HolidayTable";
import HolidayEditDialog from "@/features/holidays/edit/HolidayEditDialog";

export default function Holidays() {
  useFetchHolidays();

  return (
    <>
      <h2>祝祭日一覧</h2>
      <HolidayTableYearSelect />
      <HolidayTable />
      <HolidayEditDialog />
    </>
  );
}
