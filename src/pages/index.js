import { createBrowserRouter, Navigate } from "react-router-dom";

import MainBoard from "./MainBoard";
import QuestionDashboard from "./QuestionDashboard";
import DemographicBoard from "./DemographicBoard";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainBoard />,
    children: [
      {
        path: "",
        element: <Navigate to="/all-questions" replace />,
      },
      {
        path: "all-questions",
        element: <QuestionDashboard />,
      },
      {
        path: "those-with-primary-care",
        element: <QuestionDashboard categories={["1-primary-care"]} />,
      },
      {
        path: "those-without-primary-care",
        element: <QuestionDashboard categories={["2-no-primary-care"]} />,
      },
      {
        path: "those-looking-for-primary-care",
        element: (
          <QuestionDashboard
            categories={["3-looking-for-family-doctor-or-NP"]}
          />
        ),
      },
      {
        path: "what-is-important-in-primary-care",
        element: <QuestionDashboard categories={["4-what-is-important"]} />,
      },
      {
        path: "walkin-clinics",
        element: <QuestionDashboard categories={["5-walk-in-clinics"]} />,
      },
      {
        path: "virtual-care-team-based-care",
        element: (
          <QuestionDashboard categories={["6-virtual-care-and-teams"]} />
        ),
      },
      {
        path: "access-to-medical-information",
        element: <QuestionDashboard categories={["7-health-records"]} />,
      },
      {
        path: "reimagining-care",
        element: <QuestionDashboard categories={["8-future"]} />,
      },
      {
        path: "demographics-weighted",
        element: <DemographicBoard api={"demographics-weighted"} />,
      },
      {
        path: "demographics-unweighted",
        element: <DemographicBoard api={"demographics"} />,
      },
    ],
  },
]);
export default router;
