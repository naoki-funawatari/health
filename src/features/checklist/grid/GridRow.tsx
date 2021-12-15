import { IEmployee, IReport } from "@/interfaces/interfaces";
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
          id: 0,
          employee_id: employee.id,
          condition_id: 1,
          date,
          reason: "",
          isChanged: undefined,
        };

        const props = {
          id: report.id,
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

// const propsAreEqual = (prevProps: Readonly<IGridRow>, nextProps: Readonly<IGridRow>): boolean => {
//   const prevReports = prevProps.reports ?? [];
//   const nextReports = nextProps.reports ?? [];

//   if (prevReports.length !== nextReports.length) {
//     return false;
//   }

//   prevReports.sort((a, b) => a.date.localeCompare(b.date));
//   nextReports.sort((a, b) => a.date.localeCompare(b.date));

//   const isSame = (prev: IReport, next: IReport): boolean => {
//     if (prev.date !== next.date) {
//       return false;
//     }

//     if (next.isChanged) {
//       return false;
//     }

//     if (prev.condition_id !== next.condition_id) {
//       return false;
//     }

//     return true;
//   };

//   return prevReports.every((v, i) => isSame(v, nextReports[i]));
// };

export default GridRow;
