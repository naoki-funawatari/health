import { useConditions, useEmployees, useFetchHealthData } from "@/hooks/hooks";

const Grid = ({ syncScroll, year, month, days }) => {
  const healthData = useFetchHealthData(year, month);
  const conditions = useConditions();
  const employees = useEmployees();

  if (employees.isLoading || conditions.isLoading) {
    console.log("isLoading");
    return <h2>読み込み中...</h2>;
  }

  if (employees.error || conditions.error) console.log("error");

  if (employees.isFetching || conditions.isFetching) console.log("isFetching");

  return (
    <div className="check-list-wrapper" onScroll={e => syncScroll(e)}>
      {employees.data.map(employee => {
        const personalData = healthData.filter(o => o.employee_id === employee.id);

        return (
          <div className="flex-row" key={`check-list-${employee.no}`}>
            {days.map((day, i) => {
              const dayData = personalData.find(o => o.date === day.format("YYYY/MM/DD"));

              return (
                <div className="grid-item" key={`check-list-${day.no}-${i}`}>
                  <select defaultValue={dayData?.condition_id ?? 0}>
                    {conditions.data.map((o, p) => (
                      <option key={`check-list-${o.no}-${p}`} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
