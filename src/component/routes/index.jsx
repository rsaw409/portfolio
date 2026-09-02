import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Layout from "../layout/index.jsx";
import Contact from "../../pages/contact/index.jsx";
import About from "../../pages/about/index";
import Projects from "../../pages/project/index";
import Certification from "../../pages/certification/index";
import WorkExperience from "../../pages/workexperience/index";
import ErrorPage from "../../pages/ErrorPage/index.jsx";

import EditUserDetails from "../../pages/edit-details/edit-user-details/edit-user-details.jsx";
import EditCertificates from "../../pages/edit-details/edit-certficates/edit-certificates.jsx";
import EditExperiences from "../../pages/edit-details/edit-experiences/edit-experiences.jsx";
import EditSkills from "../../pages/edit-details/edit-skills/edit-skills.jsx";
import EditEducation from "../../pages/edit-details/edit-educations/edit-educations.jsx";
import EditProjects from "../../pages/edit-details/edit-projects/edit-projects.jsx";

import { loadUser } from "../../api/user.js";
import {
  getUser,
  setUserFromGoogle,
  setUserFromUrl,
} from "../../redux/action.js";
import { useDispatch } from "react-redux";
import { generateUrl } from "../../utils/util.js";

const AnimateRoutes = ({ setOpenSnackBar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getLogedInUser = async () => {
      try {
        const resObject = await loadUser();
        const email = resObject.user?.emails[0]?.value;
        const displayName = resObject.user?.displayName;

        dispatch(getUser(email, displayName));
        dispatch(setUserFromGoogle(resObject.user));

        const { path } = generateUrl(window.location.pathname, email, true);
        navigate(path, { replace: true });
        return;
      } catch (error) {
        const { path, email } = generateUrl(
          window.location.pathname,
          "rsaw409@gmail.com",
          false,
        );

        dispatch(getUser(email, null));
        dispatch(setUserFromUrl(email));
        navigate(path, { replace: true });
        return;
      }
    };

    getLogedInUser();
  }, []);

  return (
    <Routes location={location}>
      <Route
        path="/:emailId"
        element={<Layout setOpenSnackBar={setOpenSnackBar} />}
      >
        <Route
          path="about/details/edit"
          element={<EditUserDetails setOpenSnackBar={setOpenSnackBar} />}
        />
        <Route
          path="about/education/edit"
          element={<EditEducation setOpenSnackBar={setOpenSnackBar} />}
        />
        <Route
          path="about/skill/edit"
          element={<EditSkills setOpenSnackBar={setOpenSnackBar} />}
        />
        <Route path="about" element={<About />} />

        <Route path="contacts" element={<Contact />} />

        <Route
          path="workexperience/edit"
          element={<EditExperiences setOpenSnackBar={setOpenSnackBar} />}
        />
        <Route path="workexperience" element={<WorkExperience />} />

        <Route
          path="certification/edit"
          element={<EditCertificates setOpenSnackBar={setOpenSnackBar} />}
        />
        <Route path="certification" element={<Certification />} />

        <Route
          path="projects/edit"
          element={<EditProjects setOpenSnackBar={setOpenSnackBar} />}
        />
        <Route path="projects" element={<Projects />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AnimateRoutes;
