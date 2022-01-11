import { Routes, Route } from "react-router";
import CheckList from "@/features/checklist/CheckList";
import EmployeeTable from "@/features/employees/list/EmployeeTable";
import Holidays from "@/features/holidays/list/Holidays";

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<CheckList />} />
    <Route path="/employees" element={<EmployeeTable />} />
    <Route path="/holidays" element={<Holidays />} />
  </Routes>
);

export default MainRouter;
