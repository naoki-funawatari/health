import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Dayjs } from "dayjs";
import { useConditions, useEmployees, useReports } from "@/hooks/hooks";
import { conditionsState } from "@/stores/stores";
import GridRow from "@/features/checklist/grid/GridRow";
import ReasonDialog from "@/features/checklist/ReasonDialog";

interface IGrid {
  syncScroll: (e: React.UIEvent) => void;
  year: string;
  month: string;
  days: Dayjs[];
}

const Grid = (props: IGrid) => {
  const { syncScroll, year, month, days } = props;
  const monthlyReports = useReports(year, month);
  const conditions = useConditions();
  const employees = useEmployees();
  const setConditions = useSetRecoilState(conditionsState);

  useEffect(() => setConditions(conditions.data || []), [setConditions, conditions.data]);

  if (monthlyReports.isLoading || employees.isLoading) {
    return <h2>読み込み中...</h2>;
  }

  if (monthlyReports.error || employees.error) console.log("error");

  return (
    <>
      <div className="check-list-wrapper" onScroll={syncScroll}>
        {employees.data &&
          employees.data.map(employee => {
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
