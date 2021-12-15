import { useRecoilValue } from "recoil";
import { changedReportsState } from "@/stores/stores";
import { useTaegetDate, useUpdateReports } from "@/hooks/hooks";

const Header = () => {
  const { year, month } = useTaegetDate();
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
};

export default Header;
