import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";

import ErrorPage from "../ErrorPage/index.jsx";
import styles from "./index.module.css";

import GitHubIcon from "@mui/icons-material/GitHub";
import ShopIcon from "@mui/icons-material/Shop";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { faJs, faNode, faReact, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  FlutterLogo  from "../../icons/Google-flutter-logo.svg?react";


const Projects = () => {
  let { isProjectsLoading, projects, isValidView } = useSelector((state) => ({
    isProjectsLoading: state.isProjectsLoading,
    projects: state.projects,
    isValidView: state.isValidView,
  }));

  const [hoverIndex, setHoverIndex] = useState(-1);

  if (!isValidView) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.projectsContainer}>
      <h2 className={styles.projectsTitle}>Things I’ve built</h2>
      <p className={styles.projectsSubTitle}>
        A collection of personal and open-source projects that reflect my journey
        across different stacks and ideas.
      </p>

      {isProjectsLoading ? (
        <div className={styles.center}>
          <CircularProgress />
        </div>
      ) : !projects?.length ? (
        <p>No Projects Found!</p>
      ) : (
        <div className={styles.projectsGrid}>
          {projects.map((each, index) => (
            <motion.div
              key={each.id || index}
              className={`${styles.projectCard} ${hoverIndex === index ? styles.active : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.cardHeader}>
                <h3>{each.project_name}</h3>
              </div>

              <p className={styles.description}>{each.project_description}</p>

              <div className={styles.techStack}>
                {each.technology_tags.includes("flutter") && <FlutterLogo height={22} />}
                {each.technology_tags.includes("react") && (
                  <FontAwesomeIcon icon={faReact} style={{ color: "#5ED2F3" }} size="xl" />
                )}
                {each.technology_tags.includes("node") && (
                  <FontAwesomeIcon icon={faNode} style={{ color: "#57A745" }} size="2xl" />
                )}
                {each.technology_tags.includes("javascript") && (
                  <FontAwesomeIcon icon={faJs} style={{ color: "#F7DF1E" }} size="xl" />
                )}
                {each.technology_tags.includes("android") && (
                  <FontAwesomeIcon icon={faAndroid} style={{ color: "#3DDC84" }} size="xl" />
                )}
              </div>

              <div className={styles.actions}>
                {each.github_url && (
                  <NavLink to={each.github_url} target="_blank" rel="noreferrer">
                    <GitHubIcon />
                  </NavLink>
                )}
                {each.play_store_url && (
                  <NavLink to={each.play_store_url} target="_blank" rel="noreferrer">
                    <ShopIcon />
                  </NavLink>
                )}
                {each.web_url && (
                  <NavLink to={each.web_url} target="_blank" rel="noreferrer">
                    <ArrowOutwardIcon />
                  </NavLink>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
