import { memo } from "react";
import { IEmployee, IReport } from "@/apis/apis";
import GridItem from "@/features/checklist/grid/GridItem";

interface IGridRow {
  employee: IEmployee;
  reports: IReport[] | undefined;
  dates: string[];
}

const GridRow = (props: IGridRow) => {
  const { employee, reports, dates } = props;

  return (
    <div className="flex-row">
      {dates.map((date, i) => {
        const report = reports?.find(o => o.date === date) ?? {
          employee_id: employee.id,
          condition_id: 1,
          date,
          reason: "",
          isChanged: undefined,
        };

        const props = {
          employeeId: employee.id,
          date: report.date,
          conditionId: report.condition_id,
          isChanged: report.isChanged ?? false,
        };
        return <GridItem key={`check-list-${employee.id}-${i}`} {...props} />;
      })}
    </div>
  );
};

const propsAreEqual = (prevProps: Readonly<IGridRow>, nextProps: Readonly<IGridRow>): boolean => {
  const oldIds = prevProps.reports ?? [];
  const newIds = nextProps.reports ?? [];
  return oldIds.every((v, i) => newIds[i].condition_id === v.condition_id && newIds[i].isChanged);
};

export default memo(GridRow, propsAreEqual);
