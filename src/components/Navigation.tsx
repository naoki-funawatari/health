import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <h2>Navigation</h2>
    <p>
      <Link to="/">チェック表</Link>
    </p>
    <p>
      <Link to="/employees">社員一覧</Link>
    </p>
    <p>
      <Link to="/employeeregister">社員登録</Link>
    </p>
    <p>
      <Link to="/holidays">祝祭日一覧</Link>
    </p>
  </nav>
);

export default Navigation;
