import { Dayjs } from "dayjs";
import { IEmployee, IReport, IConditions } from "@/apis/apis";
import GridItem from "@/features/checklist/GridItem";

interface IGridRow {
  handleDialogOpen: (e: React.ChangeEvent) => void;
  employee: IEmployee;
  healthes: IReport[] | undefined;
  conditions: IConditions[] | undefined;
  days: Dayjs[];
}

const GridRow = (props: IGridRow) => {
  const { handleDialogOpen, employee, healthes, conditions, days } = props;
  if (!healthes || !conditions) return <></>;

  return (
    <div className="flex-row" key={`check-list-${employee.no}`}>
      {days.map((day, i) => {
        const date = day.format("YYYY/MM/DD");
        let health = healthes.find(o => o.date === date);
        if (!health) {
          health = {
            employee_id: employee.id,
            condition_id: 1,
            date,
            reason: "",
          };
        }

        return (
          <GridItem
            key={`check-list-${employee.no}-${i}`}
            {...{ handleDialogOpen, employee, health, conditions }}
          />
        );
      })}
    </div>
  );
};

export default GridRow;
