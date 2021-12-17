import { Routes, Route } from "react-router";
import CheckList from "@/features/checklist/CheckList";
import EmployeeTable from "@/features/employees/EmployeeTable";
import HolidayTable from "@/features/holidays/HolidayTable";

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<CheckList />} />
    <Route path="/employees" element={<EmployeeTable />} />
    <Route path="/holidays" element={<HolidayTable />} />
  </Routes>
);

export default MainRouter;
