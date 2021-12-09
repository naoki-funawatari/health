import { useState, useCallback } from "react";
import { Dayjs } from "dayjs";
import { useConditions, useEmployees, useFetchHealthData } from "@/hooks/hooks";
import GridRow from "@/features/checklist/GridRow";
import ReasonDialog from "@/features/checklist/ReasonDialog";

interface IGrid {
  syncScroll: (e: UIEvent) => void;
  year: string;
  month: string;
  days: Dayjs[];
}

const Grid = (props: IGrid) => {
  const { syncScroll, year, month, days } = props;
  const [isOpen, setIsOpen] = useState(false);
  const healthData = useFetchHealthData(year, month);
  const conditions = useConditions();
  const employees = useEmployees();
  const handleDialogOpen = useCallback((e: React.ChangeEvent) => {
    const element = e.target as HTMLSelectElement;
    if ([4, 5].includes(Number(element.value))) {
      setIsOpen(true);
    }
  }, []);
  const handleDialogClose = useCallback(() => setIsOpen(false), []);

  if (healthData.isLoading || employees.isLoading || conditions.isLoading) {
    console.log("isLoading");
    return <h2>読み込み中...</h2>;
  }

  if (healthData.error || employees.error || conditions.error) console.log("error");

  if (healthData.isFetching || employees.isFetching || conditions.isFetching)
    console.log("isFetching");

  return (
    <>
      <div className="check-list-wrapper" onScroll={e => syncScroll(e.nativeEvent)}>
        {employees.data &&
          employees.data.map(employee => {
            if (!healthData.data) return <></>;
            const healthes = healthData.data.filter(o => o.employee_id === employee.id);

            return (
              <GridRow
                {...{ handleDialogOpen, employee, healthes, conditions: conditions.data, days }}
              />
            );
          })}
      </div>
      <ReasonDialog {...{ isOpen, handleDialogClose }} />
    </>
  );
};

export default Grid;
