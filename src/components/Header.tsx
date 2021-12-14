import { memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reportsState, changedReportsState } from "@/stores/stores";
import { updateReports } from "@/apis/apis";
import { useTaegetDate } from "@/hooks/hooks";

const Header = memo(() => {
  const { year, month } = useTaegetDate();
  const monthlyReports = useRecoilValue(changedReportsState);
  const setReports = useSetRecoilState(reportsState);
  const handlePushAndPullClicked = async () => {
    const newReports = await updateReports(year, month, monthlyReports);
    setReports(newReports);
  };

  return (
    <header>
      <h1>Header</h1>
      <div>
        <button onClick={handlePushAndPullClicked}>push / pull</button>
      </div>
    </header>
  );
});

export default Header;
