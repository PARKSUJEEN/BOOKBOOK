import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Setting from "./pages/Main/Setting";
import Userlogin from "./pages/Main/Userlogin";
import Register from "./pages/Main/Register";
import Edit from "./pages/Book/Edit";
import BookDiary from "./pages/Book/BookDiary";

import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./assets/fbase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "./pages/Main/Loading";
import BookNew from "./pages/BookDiary/BookNew";
import BookContent from "./pages/BookDiary/BookContent";
import Name from "./pages/Main/Name";
import BookEdit from "./pages/BookDiary/BookEdit";
import Home from "./pages/Book/Home";
import Main from "./pages/Main/Main";

const userreducer = (state2, action) => {
  let newState2 = [];
  switch (action.type) {
    case "LOGIN": {
      return action.udata;
    }

    case "NAMECHANGE": {
      newState2 = state2.map((it) =>
        it.uid === action.uid
          ? {
              ...it,
              name: action.newName,
            }
          : it
      );
      break;
    }
    default:
      return state2;
  }

  return newState2;
};

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              bookname: action.newBookname,
              bookcolor: action.newBookcolor,
            }
          : it
      );
      break;
    }

    case "BOOKCREATE": {
      const newDiary = {
        ...action.bddata,
      };
      newState = [newDiary, ...state];
      break;
    }

    case "BOOKINIT": {
      return action.bddata;
    }

    case "BOOKREMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }

    case "BOOKEDIT": {
      newState = state.map((it) =>
        it.id === action.targetId ? { ...action.bddata } : it
      );
      break;
    }

    default:
      return state;
  }

  return newState;
};

export const BookStateContext = React.createContext();
export const BookDispatchContext = React.createContext();
export const userContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [bddata, dispatch2] = useReducer(reducer, []);
  const [udata, dispatch3] = useReducer(userreducer, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    login();
  }, []);
  const auth = getAuth();
  const user = auth.currentUser;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        getData(user);
        getUser(user);
        return;
      }

      console.log("로그인x");
    });
  };

  const getData = useCallback(async (user) => {
    let initData = [];
    const querySnapshot = await getDocs(collection(db, "booklist"));

    querySnapshot.forEach((doc) => {
      if (doc.data().user_uid === user.uid) {
        initData.push(doc.data());
      }
    });

    dispatch({ type: "INIT", data: initData });
  }, []);

  const getUser = async (user) => {
    const querySnapshot = await getDocs(collection(db, "user"));

    querySnapshot.forEach((doc) => {
      if (doc.data().uid === user.uid) {
        // userData.push(doc.data());

        dispatch3({ type: "LOGIN", udata: doc.data() });
      }
    });

    return setLoading(false);
  };

  const dataId = Math.random().toString(36).substring(2, 7);

  const onCreate = useCallback(async (bookname, bookColor, bookdate) => {
    dispatch({
      type: "CREATE",
      data: {
        bookname,
        id: dataId,
        bookcolor: bookColor,
        date: new Date(bookdate).getTime(),
      },
    });

    try {
      const docRef = await setDoc(doc(db, "booklist", dataId), {
        bookname: bookname,
        id: dataId,
        bookcolor: bookColor,
        date: new Date(bookdate).getTime(),
        user_uid: user.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });

  const onRemove = useCallback(async (targetId) => {
    dispatch({ type: "REMOVE", targetId });

    const userDoc = doc(db, "booklist", targetId);
    try {
      const res = await deleteDoc(userDoc);
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      alert("책이 삭제되었습니다.");
    }
  }, []);

  const onEdit = useCallback(async (targetId, bookname, bookcolor) => {
    dispatch(
      {
        type: "EDIT",
        data: {
          id: targetId,
          bookname,
          bookcolor,
        },
      },
      []
    );

    const newbooknameRef = doc(db, "booklist", targetId);

    await updateDoc(newbooknameRef, {
      id: targetId,
      bookname: bookname,
      bookcolor: bookcolor,
    });
  }, []);

  const onTitleGet = async (targetId) => {
    let initBookData = [];

    const querySnapshot = await getDocs(
      collection(db, "booklist", `${targetId}/bookdiaries`)
    );

    querySnapshot.forEach((doc) => {
      initBookData.push(doc.data());
    });
    dispatch2({ type: "BOOKINIT", bddata: initBookData });
  };

  const onTitleCreate = useCallback(
    async (bdiaryTitle, bdiaryContent, bdiaryDate, bdiaryId, id) => {
      dispatch2({
        type: "BOOKCREATE",
        bddata: {
          bdiaryTitle,
          bdiaryContent,
          bdiaryDate,
          bdiaryId: bdiaryId,
          id: bdiaryId,
        },
      });

      const created_date = new Date().getTime();

      try {
        const userRef = doc(db, "booklist", `${id}`);

        await setDoc(doc(userRef, "bookdiaries", `${bdiaryId}`), {
          bdiaryTitle: bdiaryTitle,
          bdiaryContent: bdiaryContent,
          bdiaryDate: created_date,
          bdiaryId: bdiaryId,
          id: id,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    []
  );

  const onTitleRemove = useCallback(async (id, targetId) => {
    dispatch2({ type: "BOOKREMOVE", targetId });
    console.log(id, targetId);

    const userDoc = doc(db, `booklist/${id}/bookdiaries`, `${targetId}`);
    try {
      const res = await deleteDoc(userDoc);
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      alert("책의 기록이 삭제되었습니다.");
    }
  }, []);

  const onTitleEdit = useCallback(
    async (targetId, bdiaryTitle, bdiaryContent, bdiaryDate, bdiaryId) => {
      dispatch2({
        type: "BOOKEDIT",
        data: {
          id: targetId,
          bdiaryTitle,
          bdiaryContent,
          bidaryDate: bdiaryDate,
        },
      });
      const userDoc = doc(
        db,
        `booklist/${targetId}/bookdiaries`,
        `${bdiaryId}`
      );

      await updateDoc(userDoc, {
        id: targetId,
        bdiaryTitle: bdiaryTitle,
        bdiaryContent: bdiaryContent,
      });
    },
    []
  );

  return (
    <userContext.Provider value={{ udata }}>
      <BookStateContext.Provider value={{ data, bddata }}>
        <BookDispatchContext.Provider
          value={{
            onCreate,
            onRemove,
            onEdit,
            onTitleCreate,
            onTitleGet,
            onTitleRemove,
            onTitleEdit,
          }}
        >
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <>{loading ? <Loading /> : <Home />}</>
                    ) : (
                      <Main />
                    )
                  }
                />

                <Route path="/home" element={<Home />} />

                <Route path="/setting" element={<Setting />} />
                <Route path="/diary/:id/edit" element={<Edit />} />
                <Route path="/diary/:id/new" element={<BookNew />} />
                <Route path="/diary/:id" element={<BookDiary />} />
                <Route path="/diary/:id/:key/read" element={<BookContent />} />
                <Route path="/name" element={<Name />} />
                <Route path="/diary/:id/write" element={<BookEdit />} />
                <Route path="/diary/:id/:key/edit" element={<BookEdit />} />
                {/* <Route path="/new" element={<New />} /> */}
                <Route path="*" element={<Navigate to="/"></Navigate>} />
                <Route
                  path="/login"
                  element={isLoggedIn ? <Home /> : <Userlogin />}
                />
                <Route
                  path="/register"
                  element={isLoggedIn ? <Home /> : <Register />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </BookDispatchContext.Provider>
      </BookStateContext.Provider>
    </userContext.Provider>
  );
}

export default App;
