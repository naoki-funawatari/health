import { Routes, Route } from "react-router";
import CheckList from "@/features/checklist/CheckList";
import EmployeeTable from "@/features/employees/EmployeeTable";
import HolidayTable from "@/features/holidays/HolidayTable";

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<CheckList />} />
    <Route path="/employees" element={<EmployeeTable />} />
    <Route path="/holidays" element={<HolidayTable />} />
    <Route path="/checklist" element={<CheckList />} />
  </Routes>
);

export default MainRouter;
