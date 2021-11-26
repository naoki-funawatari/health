import { useTaegetDate } from "@/hooks/hooks";
import employees from "@/db/master/employees.json";
import conditions from "@/db/master/conditions.json";

const CheckList = ({ syncScroll }) => {
  const { days } = useTaegetDate();

  return (
    <div className="check-list-wrapper" onScroll={e => syncScroll(e)}>
      {employees.map(o => (
        <div className="flex-row" key={`check-list-${o.no}`}>
          {days.map((o, i) => (
            <div className="grid-item" key={`check-list-${o.no}-${i}`}>
              <select>
                {conditions.map((o, p) => (
                  <option key={`check-list-${o.no}-${p}`}>{o.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheckList;
