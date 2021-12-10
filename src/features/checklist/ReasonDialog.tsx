import { useRecoilState } from "recoil";
import ReactModal, { Styles } from "react-modal";
import { isOpenState } from "@/features/checklist/Grid";

const style: Styles = {
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

const ReasonDialog = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenState);
  const handleDialogClose = () => setIsOpen(false);

  return (
    <ReactModal {...{ isOpen, style }} contentLabel="Settings">
      <h2>ここに理由を入力</h2>
      <div>
        <input type="text" name="" id="" />
      </div>
      <br />
      <div>
        <button onClick={handleDialogClose}>ダイアログを閉じる</button>
      </div>
    </ReactModal>
  );
};

export default ReasonDialog;
