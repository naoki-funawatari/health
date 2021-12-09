import { useState } from "react";
import ReactModal, { Styles } from "react-modal";
import { Dayjs } from "dayjs";
import { useConditions, useEmployees, useFetchHealthData } from "@/hooks/hooks";

const modalStyle: Styles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "static",
    inset: "auto",
  },
};

const Grid = ({
  syncScroll,
  year,
  month,
  days,
}: {
  syncScroll: (e: UIEvent) => void;
  year: string;
  month: string;
  days: Dayjs[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const healthData = useFetchHealthData(year, month);
  const conditions = useConditions();
  const employees = useEmployees();
  const handleDialogOpen = (e: React.ChangeEvent) => {
    const element = e.target as HTMLSelectElement;
    if ([4, 5].includes(Number(element.value))) {
      setIsOpen(true);
    }
  };
  const handleDialogClose = () => setIsOpen(false);

  if (healthData.isLoading || employees.isLoading || conditions.isLoading) {
    console.log("isLoading");
    return <h2>読み込み中...</h2>;
  }

  if (healthData.error || employees.error || conditions.error) console.log("error");

  if (healthData.isFetching || employees.isFetching || conditions.isFetching)
    console.log("isFetching");

  return (
    <>
      <div className="check-list-wrapper" onScroll={e => syncScroll(e.nativeEvent)}>
        {employees.data?.map(employee => {
          if (!healthData) {
            return <></>;
          }
          const personalData = healthData.data?.filter(o => o.employee_id === employee.id);

          return (
            <div className="flex-row" key={`check-list-${employee.no}`}>
              {days.map((day, i) => {
                const dayData = personalData?.find(o => o.date === day.format("YYYY/MM/DD"));

                return (
                  <div className="grid-item" key={`check-list-${employee.no}-${i}`}>
                    <select defaultValue={dayData?.condition_id} onChange={handleDialogOpen}>
                      {conditions.data?.map(condition => (
                        <option
                          key={`check-list-${employee.no}-${condition.id}`}
                          value={condition.id}
                        >
                          {condition.name}
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
      <ReactModal {...{ isOpen }} contentLabel="Settings" style={modalStyle}>
        <h2>ここに理由を入力</h2>
        <div>
          <input type="text" name="" id="" />
        </div>
        <br />
        <div>
          <button onClick={handleDialogClose}>ダイアログを閉じる</button>
        </div>
      </ReactModal>
    </>
  );
};

export default Grid;
