import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function TabbedNavLink({ to, children }) {
  const location = useLocation();
  const activeClasses =
    "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 active-tab";
  const normalclasses =
    "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 normal-tab";
  const classes = location.pathname === to ? activeClasses : normalclasses;
  return (
    <NavLink className={classes} to={to}>
      {children}
    </NavLink>
  );
}

export default TabbedNavLink;
