import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkAuth, logout } from "../../redux/slices/authSlise";
import { RootState } from "../../redux/storeTypes";
import { useAppDispatch } from "../../redux/storeTypes";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import RegistForm from "./RegistForm";
import styles from "./AuthForm.module.scss";
import userIcon from "../../assets/img/user.png";

export default function BtnLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, user, isAdmin } = useSelector(
    (state: RootState) => state.auth
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  const loginbtn = () => {
    return (
      <button
        className={`button button--login ${
          isModalOpen ? "button--active" : ""
        }`}
        onClick={() => setModalOpen(true)}
      >
        <span>Log in</span>
        <svg
          width="17px"
          height="17px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            d="M9.76076555,0 C15.4157386,0 20,4.4771525 20,10 C20,15.5228475 15.4157386,20 9.76076555,20 C6.56885647,20 3.61836948,18.5634688 1.68988581,16.1544725 C1.46202241,15.8698333 1.51356853,15.4586837 1.80501731,15.2361442 C2.09646608,15.0136047 2.51745178,15.0639465 2.74531518,15.3485857 C4.4225344,17.443711 6.98554674,18.6915888 9.76076555,18.6915888 C14.6758356,18.6915888 18.6602871,14.8002319 18.6602871,10 C18.6602871,5.19976806 14.6758356,1.30841121 9.76076555,1.30841121 C7.02601512,1.30841121 4.49642844,2.51988396 2.81675903,4.5633425 C2.58516542,4.84509553 2.16355149,4.89014431 1.87505796,4.66396176 C1.58656443,4.43777922 1.54043793,4.02601608 1.77203154,3.74426305 C3.70333647,1.39466883 6.61544133,0 9.76076555,0 Z M10.3053281,6.86239745 L13.0119569,9.56902627 C13.2735521,9.83062149 13.2785069,10.2497964 13.0230237,10.5052795 L10.3796339,13.1486694 C10.1241507,13.4041526 9.70497582,13.3991978 9.4433806,13.1376026 C9.18178539,12.8760073 9.1768306,12.4568325 9.43231378,12.2013493 L10.98,10.6534046 L0.669856459,10.6542056 C0.299904952,10.6542056 7.72715225e-14,10.3613078 7.72715225e-14,10 C7.72715225e-14,9.63869222 0.299904952,9.34579439 0.669856459,9.34579439 L10.938,9.34540456 L9.38014161,7.78758389 C9.11854639,7.52598867 9.11359161,7.1068138 9.36907479,6.85133062 C9.62455797,6.59584744 10.0437328,6.60080223 10.3053281,6.86239745 Z"
          />
        </svg>
      </button>
    );
  };

  const logoutbtn = () => {
    return (
      <div className={styles["user-info"]}>
        <div className={styles["user-email"]}>
          <img src={userIcon} alt="User icon" />
          <span>{user?.email} </span>
        </div>
        <div className={styles["user-verif-btn"]}>
          {user?.isActivated ? (
            <span className={styles["user-verific"]}>
              Verified
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="5"
                viewBox="0 0 2 2"
              >
                <circle
                  r="1"
                  cx="1"
                  cy="1"
                  fill="#008000"
                  fill-opacity="0.78"
                />
              </svg>
            </span>
          ) : (
            <span className={styles["user-not-verific"]}>
              Not verified
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="5"
                viewBox="0 0 2 2"
              >
                <circle
                  r="1"
                  cx="1"
                  cy="1"
                  fill="#ff1414"
                  fill-opacity="0.78"
                />
              </svg>
            </span>
          )}
          <button
            onClick={() => setLogoutModalOpen(true)}
            className={`button button--logout ${
              isModalOpen ? "button--active" : ""
            }`}
          >
            <span>Log out</span>
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
                d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10c-3.192 0-6.142-1.437-8.07-3.846-.228-.285-.176-.696.115-.918.292-.222.713-.172.941.113C4.423 17.444 6.986 18.692 10 18.692c4.915 0 8.9-3.892 8.9-8.692S14.915 1.308 10 1.308c-2.735 0-5.265 1.211-6.944 3.254-.232.282-.654.327-.942.101-.288-.227-.334-.639-.102-.921C4.297 1.395 7.209 0 10 0zm.544 6.862 2.706 2.706c.262.262.267.681.011.936L10.206 13.15c-.255.255-.674.25-.936-.011-.262-.262-.267-.681-.011-.936l1.548-1.548H.67C.3 10.654 0 10.361 0 10s.3-.654.67-.654h10.268l-1.558-1.558c-.262-.262-.257-.681.011-.936.268-.255.687-.25.943.012z"
              />
            </svg>
          </button>
        </div>
        {isAdmin && (
          <button
            onClick={() => navigate("/add-pizza")}
            className={styles["button--add"]}
          >
            Add Pizza
          </button>
        )}
      </div>
    );
  };

  const logoutModal = () => {
    return (
      <div className={styles["logout-modal-overlay"]}>
        <div className={styles["logout-modal"]}>
          <h2>Are you sure you want to log out of your account?</h2>
          <div className={styles["buttons"]}>
            <button
              onClick={logoutFromAC}
              className={styles["button-logout-yes"]}
            >
              <span>Yes</span>
            </button>
            <button
              onClick={() => setLogoutModalOpen(false)}
              className={styles["button-logout-no"]}
            >
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const logoutFromAC = () => {
    dispatch(logout() as any);
    setLogoutModalOpen(false);
  };

  const handleSwitchToRegistration = () => {
    setIsRegistration(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegistration(false);
  };

  return (
    <div>
      <h1>{isAuth ? logoutbtn() : loginbtn()}</h1>
      {isModalOpen && (
        <>
          {isRegistration ? (
            <RegistForm
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              title="Registration"
              onSwitchToRegistration={handleSwitchToLogin}
            />
          ) : (
            <AuthForm
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              title="Log in"
              onSwitchToRegistration={handleSwitchToRegistration}
            />
          )}
        </>
      )}
      {isLogoutModalOpen && logoutModal()}
    </div>
  );
}

//className="button button--cart"
