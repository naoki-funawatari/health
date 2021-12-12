import { memo } from "react";
import { useRecoilValue } from "recoil";
import { reportsState } from "@/stores/stores";

const Header = memo(() => {
  const monthlyReports = useRecoilValue(reportsState);
  const handlePushAndPullClicked = () => console.log(monthlyReports);

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
