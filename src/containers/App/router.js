import React, { Suspense, lazy } from 'react';
import {
  Routes, Route, useNavigate, Navigate, useLocation
} from 'react-router-dom';
import Loader from "app-loader";
import Home from "app-home";

const Router = () => {
  const navigate = useNavigate();
  return (
    <Suspense fallback={Loader()}>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
