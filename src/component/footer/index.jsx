import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "./index.module.css";

const Footer = () => {
  const location = useLocation();
  const { emailId } = useParams();

  const userId = emailId.split("@")[0];

  const routes = [
    { path: `/${userId}/about`, routeName: "About" },
    { path: `/${userId}/workexperience`, routeName: "Work" },
    { path: `/${userId}/certification`, routeName: "Certification" },
    { path: `/${userId}/projects`, routeName: "Projects" },
    { path: `/${userId}/contacts`, routeName: "Contact" },
  ];

  return (
    <footer className={styles.footerContainer}>
      <ul className={styles.footerNavList}>
        {routes.map((eachRoute, index) => {
          const isActive = eachRoute.path === location.pathname;
          return (
            <li key={index} className={styles.footerNavItem}>
              <Link
                to={eachRoute.path}
                className={`${styles.footerNavLink} ${
                  isActive ? styles.footerNavLinkActive : ""
                }`}
              >
                {eachRoute.routeName}
              </Link>
              {isActive && (
                <motion.div
                  className={styles.footerHighlight}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className={styles.copyText}>
        © {new Date().getFullYear()} @rsaw409
      </div>
    </footer>
  );
};

export default Footer;
