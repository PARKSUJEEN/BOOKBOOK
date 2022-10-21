import {
  deleteUser,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import Name from "./Name";
import useModal from "./useModal";

const Setting = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalOption, showModal] = useModal();
  const navigate = useNavigate();

  const onEditName = useCallback(() => {
    navigate("/name", { replace: true });
  });

  const auth = getAuth();
  const user = auth.currentUser;

  const login = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  };

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const userDel = () => {
    deleteUser(user)
      .then(() => {
        alert("탈퇴되었습니다.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    login();
  }, [user]);

  return (
    <div>
      <div className="setting_wrap">
        <>
          {isLoggedIn ? (
            <>
              <div className="changeName" onClick={onEditName}>
                이름 변경
              </div>
              <div className="logout" onClick={logout}>
                로그아웃
              </div>
              <div className="logout" onClick={userDel}>
                탈퇴하기
              </div>
            </>
          ) : (
            <>
              <div className="login">
                <span
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  로그인
                </span>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Setting;
