import { Dayjs } from "dayjs";
import { IEmployee, IReport, IConditions } from "@/apis/apis";

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
          <div className="grid-item" key={`check-list-${employee.no}-${i}`}>
            <select defaultValue={health.condition_id} onChange={handleDialogOpen}>
              {conditions.map(condition => (
                <option key={`check-list-${employee.no}-${condition.id}`} value={condition.id}>
                  {condition.name}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default GridRow;
