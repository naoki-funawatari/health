import { Dayjs } from "dayjs";
import { useConditions, useEmployees, useFetchHealthData } from "@/hooks/hooks";
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
  const healthData = useFetchHealthData(year, month);
  const conditions = useConditions();
  const employees = useEmployees();

  if (healthData.isLoading || employees.isLoading || conditions.isLoading) {
    return <h2>読み込み中...</h2>;
  }

  if (healthData.error || employees.error || conditions.error) console.log("error");

  return (
    <>
      <div className="check-list-wrapper" onScroll={syncScroll}>
        {employees.data &&
          employees.data.map(employee => {
            if (!healthData.data) return <></>;
            const healthes = healthData.data.filter(o => o.employee_id === employee.id);

            return (
              <GridRow
                key={`check-list-${employee.no}`}
                {...{ employee, healthes, conditions: conditions.data, days }}
              />
            );
          })}
      </div>
      <ReasonDialog />
    </>
  );
};

export default Grid;
