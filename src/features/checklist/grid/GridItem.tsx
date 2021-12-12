import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isOpenState, conditionsState, reportsState } from "@/stores/stores";
import { IEmployee, IReport } from "@/apis/apis";

interface IGridItem {
  employee: IEmployee;
  report: IReport;
}

const GridItem = (props: IGridItem) => {
  const { employee, report } = props;
  const setIsOpen = useSetRecoilState<boolean>(isOpenState);
  const conditions = useRecoilValue(conditionsState);
  const [reports, setReports] = useRecoilState<IReport[]>(reportsState);

  const handleReasonChanged = (e: React.ChangeEvent) => {
    const element = e.target as HTMLSelectElement;
    const conditionId = Number(element.value);
    const newReports = [...reports];
    const index = newReports.findIndex(
      o => o.employee_id === employee.id && o.date === report.date
    );
    newReports[index] = { ...newReports[index], condition_id: conditionId };
    setReports(newReports);

    if ([4, 5].includes(conditionId)) {
      setIsOpen(true);
    }
  };

  return (
    <div className="grid-item">
      <select value={report.condition_id} onChange={handleReasonChanged}>
        {conditions.map(condition => (
          <option key={`check-list-${employee.id}-${condition.id}`} value={condition.id}>
            {condition.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GridItem;
