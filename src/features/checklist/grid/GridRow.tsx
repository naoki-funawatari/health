import { Dayjs } from "dayjs";
import { IEmployee, IReport } from "@/apis/apis";
import GridItem from "@/features/checklist/grid/GridItem";

interface IGridRow {
  employee: IEmployee;
  healthes: IReport[] | undefined;
  days: Dayjs[];
}

const GridRow = (props: IGridRow) => {
  const { employee, healthes, days } = props;
  if (!healthes) return <></>;

  return (
    <div className="flex-row">
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

        return <GridItem key={`check-list-${employee.no}-${i}`} {...{ employee, health }} />;
      })}
    </div>
  );
};

export default GridRow;
