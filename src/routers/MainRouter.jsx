import { Routes, Route } from "react-router";
import CheckList from "@/features/checklist/CheckList";

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<CheckList />} />
    <Route path="/checklist" element={<CheckList />} />
  </Routes>
);

export default MainRouter;
