import React from "react";
import styles from "./AuthForm.module.scss";
import verifyImg from "../../assets/img/verify-email.png";

interface ModalProps {
  email: string;
  onClose: () => void;
}

const VerifyModal: React.FC<ModalProps> = ({ email, onClose }) => {
  return (
    <>
      <div className={styles["verify-overlay"]} onClick={onClose}></div>
      <div className={styles["verify"]}>
        <img src={verifyImg} alt="Verify your email" />
        <h2>Verify your account</h2>

        <p>
          Follow the link from the message sent to your address:{" "}
          <strong>{email}</strong>
        </p>
        <div className={styles["buttons"]}>
          <button className={styles["button-ok"]} onClick={onClose}>
            <span>Okay</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyModal;
