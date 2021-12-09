import { IEmployee, IReport, IConditions } from "@/apis/apis";

interface IGridItem {
  handleDialogOpen: (e: React.ChangeEvent) => void;
  employee: IEmployee;
  health: IReport;
  conditions: IConditions[] | undefined;
}

const GridItem = (props: IGridItem) => {
  const { handleDialogOpen, employee, health, conditions } = props;

  return (
    <div className="grid-item">
      <select defaultValue={health.condition_id} onChange={handleDialogOpen}>
        {conditions &&
          conditions.map(condition => (
            <option key={`check-list-${employee.no}-${condition.id}`} value={condition.id}>
              {condition.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default GridItem;
