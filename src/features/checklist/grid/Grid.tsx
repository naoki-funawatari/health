import { Dayjs } from "dayjs";
import { useRecoilValue } from "recoil";
import { employeesState, reportsState } from "@/stores/stores";
import { useSyncScroll } from "@/hooks/hooks";
import GridRow from "@/features/checklist/grid/GridRow";
import ReasonDialog from "@/features/checklist/ReasonDialog";

interface IGrid {
  year: string;
  month: string;
  days: Dayjs[];
}

const Grid = (props: IGrid) => {
  const { days } = props;
  const syncScroll = useSyncScroll();
  const employees = useRecoilValue(employeesState);
  const monthlyReports = useRecoilValue(reportsState);
  if (!monthlyReports.length) {
    return <h2>読み込み中...</h2>;
  }

  return (
    <>
      <div className="check-list-wrapper" onScroll={syncScroll}>
        {employees.map(employee => {
          const reports = monthlyReports.filter(o => o.employee_id === employee.id);

          return <GridRow key={`check-list-${employee.no}`} {...{ employee, reports, days }} />;
        })}
      </div>
      <ReasonDialog />
    </>
  );
};

export default Grid;
