import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Setting from "./pages/Setting";
import New from "./pages/New";
import Userlogin from "./pages/Userlogin";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import BookDiary from "./pages/BookDiary";

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
import Home from "./pages/Home";
import BookEdit from "./pages/BookEdit";
import BookContent from "./pages/BookContent";
import BookNew from "./pages/BookNew";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Main from "./pages/Main";
import Loading from "./pages/Loading";

const userreducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "LOGIN": {
      return action.udata;
    }
    case "MODAL": {
      return action.udata;
    }
    default:
      return state;
  }

  return newState;
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

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    login();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const login = () => {
    let useruser = [];

    onAuthStateChanged(auth, (user) => {
      // setLoading(true);
      if (user) {
        setIsLoggedIn(true);
        getData(user);
        getUser(user);

        console.log("login함수도 계속해서 실행중");
      } else {
        //   setIsLoggedIn(false);
      }
    });
  };

  const OPTION = {
    show: false,
    title: "",
    onSubmit: () => {},
    onClose: () => {},
    element: null,
  };

  const useModal = () => {
    console.log("userModal실행");
    const [modalOption, setModalOption] = useState(OPTION);

    const showModal = useCallback(
      (show, title, onSubmitCallback, onCloseCallback, element) => {
        setModalOption((prev) => ({
          ...prev,
          show,
          title,
          onSubmit: () => {
            if (onSubmitCallback) onSubmitCallback();
            setModalOption((prev) => ({ ...prev, show: false }));
          },
          onClose: () => {
            if (onCloseCallback) onCloseCallback();
            setModalOption((prev) => ({ ...prev, show: false }));
          },
          element,
        }));
      },
      [modalOption]
    );

    return [modalOption, showModal];
    dispatch3({ type: "MODAL", udata: modalOption });
  };

  const getData = async (user) => {
    console.log("getData함수 실행");

    let initData = [];
    const querySnapshot = await getDocs(collection(db, "booklist"));

    querySnapshot.forEach((doc) => {
      if (doc.data().user_uid === user.uid) {
        initData.push(doc.data());
      }
    });

    dispatch({ type: "INIT", data: initData });
  };

  const getUser = async (user) => {
    console.log("getUser함수실행");

    const querySnapshot = await getDocs(collection(db, "user"));

    querySnapshot.forEach((doc) => {
      if (doc.data().uid === user.uid) {
        // userData.push(doc.data());

        dispatch3({ type: "LOGIN", udata: doc.data() });
      }
    });

    setLoading(false);
  };

  const dataId = Math.random().toString(36).substring(2, 7);

  const onCreate = useCallback(async (bookname, bookColor, bookdate) => {
    dispatch({
      type: "CREATE",
      data: { bookname, id: dataId, bookcolor: bookColor, date: bookdate },
    });
    const newBook = {
      bookname,
      id: dataId,
      bookcolor: bookColor,
      date: bookdate,
    };

    try {
      const docRef = await setDoc(doc(db, "booklist", dataId), {
        bookname: bookname,
        id: dataId,
        bookcolor: bookColor,
        date: bookdate,
        user_uid: user.uid,
      });

      console.log(
        "dataId확인",
        dataId,
        "bookColor확인",
        bookColor,
        "bookdate",
        bookdate
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });

  const onRemove = async (targetId) => {
    dispatch({ type: "REMOVE", targetId });

    const userDoc = doc(db, "booklist", targetId);
    try {
      const res = await deleteDoc(userDoc);
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("firestore data삭제완");
    }
  };

  const onEdit = useCallback(async (targetId, bookname, bookcolor) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        bookname,
        bookcolor,
      },
    });

    const newbooknameRef = doc(db, "booklist", targetId);

    await updateDoc(newbooknameRef, {
      id: targetId,
      bookname: bookname,
      bookcolor: bookcolor,
    });
  }, []);

  const onTitleGet = async (targetId) => {
    console.log("targetId", targetId);

    let initBookData = [];

    const querySnapshot = await getDocs(
      collection(db, "booklist", `${targetId}/bookdiaries`)
    );

    querySnapshot.forEach((doc) => {
      //  setLoading(false);

      initBookData.push(doc.data());
    });

    console.log("ontitleget 실행완");

    dispatch2({ type: "BOOKINIT", bddata: initBookData });
  };

  const onTitleCreate = async (
    bdiaryTitle,
    bdiaryContent,
    bdiaryDate,
    bdiaryId,
    id
  ) => {
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
    const bookDiary = {
      bdiaryTitle,
      bdiaryContent,
      created_date,
      bdiaryId: bdiaryId,
      id: bdiaryId,
    };
    console.log("testid확인", id);

    try {
      const userRef = doc(db, "booklist", `${id}`);

      await setDoc(doc(userRef, "bookdiaries", `${bdiaryId}`), {
        bdiaryTitle: bdiaryTitle,
        bdiaryContent: bdiaryContent,
        bdiaryDate: bdiaryDate,
        bdiaryId: bdiaryId,
        id: bdiaryId,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onTitleRemove = async (id, targetId) => {
    dispatch2({ type: "BOOKREMOVE", targetId });

    const userDoc = doc(db, `booklist/${id}/bookdiaries`, `${targetId}`);
    try {
      const res = await deleteDoc(userDoc);
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("firestore data삭제완");
    }
  };

  const onTitleEdit = useCallback(
    async (targetId, bdiaryTitle, bdiaryContent, bdiaryDate, id, testid) => {
      dispatch2({
        type: "BOOKEDIT",
        data: {
          id: targetId,
          bdiaryTitle,
          bdiaryContent,
          bidaryDate: bdiaryDate,
        },
      });
      console.log("onTitleEdit실행!!!!!!!!!!");
      console.log("id값!!!!!!!!!!", id, "targetId", targetId);
      const userDoc = doc(db, `booklist/${id}/bookdiaries`, `${targetId}`);
      console.log("newbooknameRef", userDoc);
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
              {isLoggedIn ? (
                <Routes>
                  {loading ? (
                    <>
                      <Route Route path="/" element={<Loading />} />
                    </>
                  ) : null}

                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />

                  <Route path="/setting" element={<Setting />} />
                  <Route path="/diary/:id/edit" element={<Edit />} />
                  <Route path="/diary/:id/new" element={<BookNew />} />
                  <Route path="/diary/:id" element={<BookDiary />} />
                  <Route
                    path="/diary/:id/:key/read"
                    element={<BookContent />}
                  />
                  <Route path="/diary/:id/write" element={<BookEdit />} />
                  <Route path="/diary/:id/:key/edit" element={<BookEdit />} />
                  <Route path="/new" element={<New />} />
                </Routes>
              ) : (
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/login" element={<Userlogin />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              )}
            </div>
          </BrowserRouter>
        </BookDispatchContext.Provider>
      </BookStateContext.Provider>
    </userContext.Provider>
  );
}

export default App;
