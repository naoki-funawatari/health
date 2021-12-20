import HolidayTableHead from "@/features/holidays/list/HolidayTableHead";
import HolidayTableBody from "@/features/holidays/list/HolidayTableBody";

export default function HolidayTable() {
  return (
    <table className="holidays-table">
      <HolidayTableHead />
      <HolidayTableBody />
    </table>
  );
}
