import "styles/globals.css";
import "styles/tailwind.css";

import Head from "next/head";
import { createContext, useEffect, useState } from "react";

import { ThemeProvider } from "styled-components";
import { theme } from "theme";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { initFirebase, auth, db } from "utils/firebase";
import { useRouter } from "next/router";

const store = createStore(rootReducer, composeWithDevTools());

initFirebase();

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState({ isAuthenticated: false });
  const router = useRouter();

  const formatUsername = (userData) => {
    if (userData.displayName) return userData.displayName;

    return userData.email.split("@")[0];
  };

  useEffect(() => {
    auth().onAuthStateChanged(async (userData) => {
      if (!userData) {
        router.push("/auth/signin");
        return false;
      }

      const userDetails = await db()
        .collection("user-details")
        .doc(userData.uid)
        .get()
        .then((res) => {
          return res.data();
        });

      setCurrentUser({
        uid: userData.uid,
        email: userData.email,
        username: formatUsername(userData),
        isAuthenticated: true,
        isMfaActivated: userDetails?.is_mfa_activated || false,
      });
    });
  }, []);

  return (
    <AppContext.Provider value={{ currentUser }}>
      <div className="bg-white">
        <Provider store={store}>
          <Head>
            <title>Your best app name</title>
          </Head>
          <ThemeProvider theme={theme["default-theme"]}>
            <div className="text-gray-700" style={{ paddingBottom: 100 }}>
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </Provider>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
