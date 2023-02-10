import { Outlet } from "react-router-dom";
import TabbedNavLink from "../components/TabbedNavLink";

function MainBoard() {
  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500  border-gray-200 dark:border-gray-700 dark:text-gray-400 buttons-container">
        <li className="mr-2">
          <TabbedNavLink to="/all-questions">All Questions</TabbedNavLink>
        </li>

        <li className="mr-2">
          <TabbedNavLink to="/those-with-primary-care">
            Those with a family doctor or NP
          </TabbedNavLink>
        </li>
        <li className="mr-2">
          <TabbedNavLink to="/those-without-primary-care">
            Those without a family doctor or NP
          </TabbedNavLink>
        </li>
        <li className="mr-2">
          <TabbedNavLink to="/those-looking-for-primary-care">
            Those looking for a family doctor or NP
          </TabbedNavLink>
        </li>
        <li className="mr-2">
          <TabbedNavLink to="/what-is-important-in-primary-care">
            What is important when it comes to primary care
          </TabbedNavLink>
        </li>
        <li className="mr-2">
          <TabbedNavLink to="/walkin-clinics">
            In-person and virtual walk-in clinics
          </TabbedNavLink>
        </li>
        <li className="mr-2">
          <TabbedNavLink to="/virtual-care-team-based-care">
            Virtual care and team-based care
          </TabbedNavLink>
        </li>
        <li className="mr-2">
          <TabbedNavLink to="/access-to-medical-information">
            Access to medical information
          </TabbedNavLink>
        </li>
        <li className="mr-2">
          <TabbedNavLink to="/reimagining-care">Reimagining care</TabbedNavLink>
        </li>

        <li className="mr-2">
          <TabbedNavLink to="/demographics-weighted">
            Who responded (Weighted Data)
          </TabbedNavLink>
        </li>

        <li className="mr-2">
          <TabbedNavLink to="/demographics-unweighted">
            Who responded (Unweighted Data)
          </TabbedNavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
export default MainBoard;
