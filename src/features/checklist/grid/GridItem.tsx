import { memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isOpenState, conditionsState, reportsState } from "@/stores/stores";
import { IReport } from "@/apis/apis";

interface IGridItem {
  id: number;
  employeeId: number;
  date: string;
  conditionId: number;
  isChanged: boolean;
}

const GridItem = (props: IGridItem) => {
  const { employeeId, date, conditionId, isChanged } = props;
  const setIsOpen = useSetRecoilState<boolean>(isOpenState);
  const conditions = useRecoilValue(conditionsState);
  const setReports = useSetRecoilState<IReport[]>(reportsState);

  const handleReasonChanged = (e: React.ChangeEvent) => {
    const element = e.target as HTMLSelectElement;
    const conditionId = Number(element.value);
    setReports(oldReports => {
      const reports = [...oldReports];
      const index = reports.findIndex(o => o.employee_id === employeeId && o.date === date);
      reports[index] = { ...reports[index], condition_id: conditionId, isChanged: true };
      return reports;
    });

    if ([4, 5].includes(conditionId)) {
      setIsOpen(true);
    }
  };

  return (
    <div className="grid-item">
      <select
        value={conditionId}
        onChange={handleReasonChanged}
        className={`${isChanged ? "changed" : ""}`}
      >
        {conditions.map(condition => (
          <option key={`check-list-${employeeId}-${condition.id}`} value={condition.id}>
            {condition.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(GridItem);
