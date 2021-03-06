import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AdminPage from "../AdminPage/AdminPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

//Project specific routes

import HomePage from "../HomePage/HomePage";
import IntroPage from "../IntroPage/IntroPage";
import MissionStatement from "../MissionStatement/MissionStatement";
import Mantras from "../Mantras/Mantras";
import CoreValues from "../CoreValues/CoreValues";
import ForGood from "../ForGood/ForGood";
import LifeGoals from "../LifeGoals/LifeGoals";
import GuidingPrinciples from "../GuidingPrinciples/GuidingPrinciples";
import NextSteps from "../NextSteps/NextSteps";
import "./App.css";
import RegisterForm from "../RegisterForm/RegisterForm";
import MyManifesto from "../MyManifesto/MyManifesto";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/admin will show the admin page. */}
          <ProtectedRoute
            // shows AdminPage if logged in as an admin or superadmin
            exact
            path="/admin"
          >
            {user.role === "admin" || user.role === "superadmin" ? (
              <AdminPage />
            ) : (
              <Redirect to="/login" />
            )}
          </ProtectedRoute>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/homepage"
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/intro">
            <IntroPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows missionStatement else shows LoginPage
            exact
            path="/missionStatement"
          >
            <MissionStatement />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows mantras else shows LoginPage
            exact
            path="/mantras"
          >
            <Mantras />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows coreValues else shows LoginPage
            exact
            path="/coreValues"
          >
            <CoreValues />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows forGood else shows LoginPage
            exact
            path="/forGood"
          >
            <ForGood />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows lifeGoals else shows LoginPage
            exact
            path="/lifeGoals"
          >
            <LifeGoals />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows guidingPrinciples else shows LoginPage
            exact
            path="/guidingPrinciples"
          >
            <GuidingPrinciples />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows nextSteps else shows LoginPage
            exact
            path="/nextSteps"
          >
            <NextSteps />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows myManifesto else shows LoginPage
            exact
            path="/myManifesto"
          >
            <MyManifesto />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/homepage" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/homepage" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/homepage" />
            ) : (
              // Otherwise, show the Landing page
              <RegisterForm />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
