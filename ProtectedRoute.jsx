import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost/hostello_php/check_session.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoggedIn(data.loggedIn);
        setLoading(false);
      })
      .catch(() => {
        setLoggedIn(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Checking session...</p>;

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
