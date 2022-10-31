import {
  deleteUser,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../assets/fbase";

const Setting = ({ onClose, data }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    if (window.confirm(`정말 로그아웃 하실건가요?`)) {
      signOut(auth)
        .then(() => {
          onClose();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return;
  }, []);

  const userDel = () => {
    if (
      window.confirm(`정말 탈퇴 하실건가요? 책장의 모든 기록들이 사라집니다..`)
    ) {
      deleteUser(user)
        .then(() => {
          alert("탈퇴 되었습니다..");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return;
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
