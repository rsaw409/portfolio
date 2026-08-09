import { useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ErrorPage from "../ErrorPage/index.jsx";
import { motion } from "framer-motion";

import styles from "./index.module.css";

const Certification = () => {
  let { isCertificatesLoading, certificates, isValidView } = useSelector(
    (state) => ({
      isCertificatesLoading: state.isCertificatesLoading,
      certificates: state.certificates,
      isValidView: state.isValidView,
    }),
  );

  const [hoverIndex, setHoverIndex] = useState(-1);

  if (!isValidView) {
    return <ErrorPage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.pageContainer}
    >
      {isCertificatesLoading ? (
        <div className={styles.center}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.cardsWrapper}>
          {certificates
            .sort((a, b) =>
              b.certification_date.localeCompare(a.certification_date),
            )
            .map((each, index) => (
              <motion.div
                key={each.id || index}
                className={styles.card}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.certName}>{each.certificate_name}</h3>
                  <NavLink
                    to={each.verification_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.iconButton}
                  >
                    <ArrowOutwardIcon
                      style={{
                        color:
                          hoverIndex === index
                            ? "var(--primary-color)"
                            : "inherit",
                      }}
                    />
                  </NavLink>
                </div>

                <Typography variant="body2" className={styles.certDetails}>
                  <strong>Certified By:</strong> {each.certification_authority}
                </Typography>
                <Typography variant="body2" className={styles.certDetails}>
                  <strong>Date:</strong>{" "}
                  {new Date(each.certification_date).toLocaleDateString()}
                </Typography>
              </motion.div>
            ))}
        </div>
      )}
    </motion.div>
  );
};

export default Certification;
