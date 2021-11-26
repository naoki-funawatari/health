import { useTaegetDate, useFetchHealthData } from "@/hooks/hooks";
import employees from "@/db/master/employees.json";
import conditions from "@/db/master/conditions.json";

const CheckList = ({ syncScroll }) => {
  const { year, month, days } = useTaegetDate();
  const healthData = useFetchHealthData(year, month);

  return (
    <div className="check-list-wrapper" onScroll={e => syncScroll(e)}>
      {employees.map(employee => {
        const personalData = healthData.filter(o => o.employee_id === employee.id);

        return (
          <div className="flex-row" key={`check-list-${employee.no}`}>
            {days.map((day, i) => {
              const dayData = personalData.find(o => o.date === day.format("YYYY/MM/DD"));
              console.log(dayData);

              return (
                <div className="grid-item" key={`check-list-${day.no}-${i}`}>
                  <select defaultValue={dayData?.condition_id ?? 0}>
                    {conditions.map((o, p) => (
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

export default CheckList;
