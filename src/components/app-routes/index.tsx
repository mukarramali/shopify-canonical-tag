import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, OauthRedirectHandler } from "../../pages";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login_redirect" element={<OauthRedirectHandler />} />
      </Routes>
    </div>
  );
}
