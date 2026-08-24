import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import ErrorPage from "../ErrorPage/index.jsx";
import { motion } from "framer-motion";

import styles from "./index.module.css";

const WorkExperience = () => {
  let { isWorkExperiencesLoading, workExperiences, isValidView } = useSelector(
    (state) => ({
      isWorkExperiencesLoading: state.isWorkExperiencesLoading,
      workExperiences: state.workExperiences,
      isValidView: state.isValidView,
    })
  );

  if (!isValidView) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.pageContainer}>
      {isWorkExperiencesLoading ? (
        <div className={styles.center}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.timeline}>
          {workExperiences.map((work, index) => (
            <motion.div
              key={work.id || index}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.timelineDot} />
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.company}>{work.company_name}</h3>
                  <span className={styles.duration}>
                    {dayjs(work.start_date).format("MMM YYYY")} –{" "}
                    {work.end_date
                      ? dayjs(work.end_date).format("MMM YYYY")
                      : "Current"}
                  </span>
                </div>
                <Typography variant="subtitle1" className={styles.designation}>
                  {work.designation}
                </Typography>
                <ul className={styles.details}>
                  {work.details ? (
                    work.details
                      .split(".")
                      .filter((a) => !!a)
                      .map((e, i) => <li key={i}>{`${e}.`}</li>)
                  ) : (
                    <li>Not Available.</li>
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
