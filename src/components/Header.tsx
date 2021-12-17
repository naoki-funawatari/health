import { useRecoilValue } from "recoil";
import { reportDateState, changedReportsState } from "@/stores/stores";
import { useUpdateReports } from "@/hooks/hooks";

export default function Header() {
  const { year, month } = useRecoilValue(reportDateState);
  const reports = useRecoilValue(changedReportsState);
  const { mutateAsync } = useUpdateReports(year, month, reports);
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
