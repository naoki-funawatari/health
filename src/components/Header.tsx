import { useRecoilValue } from "recoil";
import { changedReportsState, yearMonthState } from "@/stores/stores";
import { useUpdateReports } from "@/hooks/hooks";

export default function Header() {
  const { year, month } = useRecoilValue(yearMonthState);
  const monthlyReports = useRecoilValue(changedReportsState);
  const { mutateAsync } = useUpdateReports(year, month, monthlyReports);
  const handlePushAndPullClicked = async () => await mutateAsync();

  return (
    <header>
      <h1>Header</h1>
      <div>
        <button onClick={handlePushAndPullClicked}>push / pull</button>
      </div>
    </header>
  );
}
