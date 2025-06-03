import React, { useState } from "react";
import { useAppDispatch } from "../../redux/storeTypes";
import { login } from "../../redux/slices/authSlise";
import styles from "./AuthForm.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSwitchToRegistration: () => void;
}

const AuthForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onSwitchToRegistration,
}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { isAdmin, isAuth } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login({ email, password }) as any);
    onClose();
  };

  if (!isOpen) return null;

  return (
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
          <button className={styles["button-log"]} onClick={handleLogin}>
            Log in
          </button>
          <button
            className={styles["button-reg"]}
            onClick={() => {
              onSwitchToRegistration();
            }}
          >
            Registration
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
