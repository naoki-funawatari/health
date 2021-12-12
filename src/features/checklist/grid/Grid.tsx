import { memo } from "react";
import { useRecoilValue } from "recoil";
import { employeesState, reportsState } from "@/stores/stores";
import { useSyncScroll } from "@/hooks/hooks";
import GridRow from "@/features/checklist/grid/GridRow";
import ReasonDialog from "@/features/checklist/ReasonDialog";

interface IGrid {
  dates: string[];
}

const Grid = (props: IGrid) => {
  const { dates } = props;
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

          return <GridRow key={`check-list-${employee.no}`} {...{ employee, reports, dates }} />;
        })}
      </div>
      <ReasonDialog />
    </>
  );
};

const propsAreEqual = (prevProps: Readonly<IGrid>, nextProps: Readonly<IGrid>): boolean => {
  const oldDates = prevProps.dates;
  const newDates = nextProps.dates;
  return oldDates.every((v, i) => newDates[i] === v);
};

export default memo(Grid, propsAreEqual);
