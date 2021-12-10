import { useSetRecoilState } from "recoil";
import { IEmployee, IReport, IConditions } from "@/apis/apis";
import { isOpenState } from "@/features/checklist/Grid";

interface IGridItem {
  employee: IEmployee;
  health: IReport;
  conditions: IConditions[] | undefined;
}

const GridItem = (props: IGridItem) => {
  const { employee, health, conditions } = props;
  const setIsOpen = useSetRecoilState<boolean>(isOpenState);
  const handleDialogOpen = (e: React.ChangeEvent) => {
    const element = e.target as HTMLSelectElement;
    if ([4, 5].includes(Number(element.value))) {
      setIsOpen(true);
    }
  };

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
