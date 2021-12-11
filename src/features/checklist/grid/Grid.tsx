import { Dayjs } from "dayjs";
import { useRecoilValue } from "recoil";
import { employeesState } from "@/stores/stores";
import { useSyncScroll, useReports } from "@/hooks/hooks";
import GridRow from "@/features/checklist/grid/GridRow";
import ReasonDialog from "@/features/checklist/ReasonDialog";

interface IGrid {
  year: string;
  month: string;
  days: Dayjs[];
}

const Grid = (props: IGrid) => {
  const { year, month, days } = props;
  const syncScroll = useSyncScroll();
  const employees = useRecoilValue(employeesState);
  const monthlyReports = useReports(year, month);

  if (monthlyReports.isLoading) {
    return <h2>読み込み中...</h2>;
  }

  if (monthlyReports.error) console.log("error");

  return (
    <>
      <div className="check-list-wrapper" onScroll={syncScroll}>
        {employees.map(employee => {
          if (!monthlyReports.data) return <></>;
          const reports = monthlyReports.data.filter(o => o.employee_id === employee.id);

          return <GridRow key={`check-list-${employee.no}`} {...{ employee, reports, days }} />;
        })}
      </div>
      <ReasonDialog />
    </>
  );
};

export default Grid;
