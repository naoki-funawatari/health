import Modal from "react-modal";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Main from "@/components/Main";

Modal.setAppElement("#root");

const App = () => (
  <>
    <Header />
    <Navigation />
    <Main />
  </>
);

export default App;
