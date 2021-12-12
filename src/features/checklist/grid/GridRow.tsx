import { memo } from "react";
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

  return (
    <div className="flex-row">
      {days.map((day, i) => {
        const date = day.format("YYYY/MM/DD");
        const report = reports?.find(o => o.date === date) ?? {
          employee_id: employee.id,
          condition_id: 1,
          date,
          reason: "",
        };

        const props = {
          employeeId: employee.id,
          date: report.date,
          conditionId: report.condition_id,
        };
        return <GridItem key={`check-list-${employee.id}-${i}`} {...props} />;
      })}
    </div>
  );
};

const propsAreEqual = (prevProps: Readonly<IGridRow>, nextProps: Readonly<IGridRow>): boolean => {
  const oldIds = prevProps.reports?.map(o => o.condition_id) ?? [];
  const newIds = nextProps.reports?.map(o => o.condition_id) ?? [];
  return oldIds.every((v, i) => newIds[i] === v);
};

export default memo(GridRow, propsAreEqual);
