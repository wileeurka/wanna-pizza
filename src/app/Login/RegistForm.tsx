import React, { useState } from "react";
import { useAppDispatch } from "../../redux/storeTypes";
import { registration } from "../../redux/slices/authSlise";
import styles from "./AuthForm.module.scss";
import VerifyModal from "./VerifyModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSwitchToRegistration: () => void;
}

const RegistForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onSwitchToRegistration,
}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegistration = () => {
    dispatch(registration({ email, password }) as any);
    setIsModalOpen(true);
  };

  if (!isOpen && !isModalOpen) return null;

  return (
    <>
      {isOpen && !isModalOpen && (
        <>
          <div className={styles["auth-form-overlay"]} onClick={onClose}></div>
          <div className={styles["auth-form"]}>
            <h2>{title}</h2>
            <div className={styles["inputsiki"]}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles["buttons"]}>
              <button
                className={styles["button-log"]}
                onClick={() => {
                  handleRegistration();
                }}
              >
                Registration
              </button>
              <button
                className={styles["button-reg"]}
                onClick={onSwitchToRegistration}
              >
                Back to log in
              </button>
            </div>
          </div>
        </>
      )}
      {isModalOpen && (
        <VerifyModal
          email={email}
          onClose={() => {
            setIsModalOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default RegistForm;
