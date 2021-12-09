import ReactModal, { Styles } from "react-modal";

interface IReasonDialog {
  isOpen: boolean;
  handleDialogClose: () => void;
}

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

const ReasonDialog = ({ isOpen, handleDialogClose }: IReasonDialog) => (
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

export default ReasonDialog;
