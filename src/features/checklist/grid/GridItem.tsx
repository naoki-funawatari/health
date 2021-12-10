import { useRecoilValue, useSetRecoilState } from "recoil";
import { IEmployee, IReport } from "@/apis/apis";
import { isOpenState, conditionsState } from "@/stores/stores";

interface IGridItem {
  employee: IEmployee;
  report: IReport;
}

const GridItem = (props: IGridItem) => {
  const { employee, report } = props;
  const setIsOpen = useSetRecoilState<boolean>(isOpenState);
  const conditions = useRecoilValue(conditionsState);
  const handleDialogOpen = (e: React.ChangeEvent) => {
    const element = e.target as HTMLSelectElement;
    if ([4, 5].includes(Number(element.value))) {
      setIsOpen(true);
    }
  };

  return (
    <div className="grid-item">
      <select defaultValue={report.condition_id} onChange={handleDialogOpen}>
        {conditions.map(condition => (
          <option key={`check-list-${employee.no}-${condition.id}`} value={condition.id}>
            {condition.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GridItem;
