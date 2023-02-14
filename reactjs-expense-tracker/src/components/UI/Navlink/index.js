import React from "react";

// Importing Link, useResolvedPath, useMatch from react router DOM
import { Link, useResolvedPath, useMatch } from "react-router-dom";

// Exporting function Navlink 
export default function Navlink({ to, children }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link to={to} className={`nav-link ${match ? "active" : ""}`}>
      {children}
    </Link>
  );
}
