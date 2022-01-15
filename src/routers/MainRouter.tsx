import { Routes, Route } from "react-router";
import CheckList from "@/features/checklist/CheckList";
import EmployeeTable from "@/features/employees/list/EmployeeTable";
import EmployeeRegisterDialog from "@/features/employees/register/EmployeeRegisterDialog";
import Holidays from "@/features/holidays/list/Holidays";
import BuForm from "@/features/maintenance/BuForm";

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<CheckList />} />
    <Route path="/employees" element={<EmployeeTable />} />
    <Route path="/employeeregister" element={<EmployeeRegisterDialog />} />
    <Route path="/holidays" element={<Holidays />} />
    <Route path="/maintenance/bu" element={<BuForm />} />
    <Route path="/maintenance/ka" element={<h1>課</h1>} />
    <Route path="/maintenance/rank" element={<h1>職位</h1>} />
  </Routes>
);

export default MainRouter;
