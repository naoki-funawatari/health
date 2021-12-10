import { Dayjs } from "dayjs";
import { IEmployee, IReport } from "@/apis/apis";
import GridItem from "@/features/checklist/grid/GridItem";

interface IGridRow {
  employee: IEmployee;
  reports: IReport[] | undefined;
  days: Dayjs[];
}

const GridRow = (props: IGridRow) => {
  const { employee, reports, days } = props;
  if (!reports) return <></>;

  return (
    <div className="flex-row">
      {days.map((day, i) => {
        const date = day.format("YYYY/MM/DD");
        let report = reports.find(o => o.date === date);
        if (!report) {
          report = {
            employee_id: employee.id,
            condition_id: 1,
            date,
            reason: "",
          };
        }

        return <GridItem key={`check-list-${employee.no}-${i}`} {...{ employee, report }} />;
      })}
    </div>
  );
};

export default GridRow;
