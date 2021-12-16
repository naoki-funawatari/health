import { useFetchHolidays, useTaegetDate } from "@/hooks/hooks";
import MainRouter from "@/routers/MainRouter";

export default function Main() {
  const { year, month } = useTaegetDate();
  useFetchHolidays(year, month);

  return (
    <main>
      <MainRouter />
    </main>
  );
}
