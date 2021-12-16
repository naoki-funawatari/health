import { IHolidays } from "@/interfaces/interfaces";

export default function HolidayRow({ date, name }: IHolidays) {
  return (
    <tr>
      <td>{date}</td>
      <td>{name}</td>
    </tr>
  );
}
