import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import FeedPage from "./components/FeedPage"
import SplashPage from './components/SplashPage';
import ProfilePage from "./components/ProfilePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SignupFormModal from "./components/SignupFormModal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {sessionUser ?  <Navigation isLoaded={isLoaded} /> : <SplashPage isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            {/* <SignupFormPage /> */}
            <SignupFormModal />
          </Route>
          <Route exact path="/Feed" >
            <FeedPage />
          </Route>
          <Route exact path="/Profile/:userId" >
            <ProfilePage />
          </Route>
          <Route excat path="/">
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
