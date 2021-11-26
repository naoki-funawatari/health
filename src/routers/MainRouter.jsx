import { Routes, Route } from "react-router";
import CheckListWrapper from "@/features/checklist/CheckListWrapper";

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<CheckListWrapper />} />
    <Route path="/checklist" element={<CheckListWrapper />} />
  </Routes>
);

export default MainRouter;
