import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import ErrorPage from "../ErrorPage/index.jsx";

import styles from "./index.module.css";

const Contact = () => {
  const { isUserLoading, user, isValidView } = useSelector((state) => ({
    isUserLoading: state.isUserLoading,
    user: state.user,
    isValidView: state.isValidView,
  }));

  const email = user?.user_email;
  const social_links = user?.social_links;

  const contacts = [
    {
      id: 1,
      title: email,
      getLogo: () => <FontAwesomeIcon icon={faEnvelope} size="lg" />,
      url: `mailto:${email}`,
    },
    {
      id: 2,
      title: "Connect on LinkedIn",
      getLogo: () => <FontAwesomeIcon icon={faLinkedin} size="lg" />,
      url: social_links?.linkedin_url,
    },
    {
      id: 3,
      title: "Follow on Github",
      getLogo: () => <FontAwesomeIcon icon={faGithub} size="lg" />,
      url: social_links?.github_url,
    },
  ];

  if (!isValidView) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.contactContainer}>
      {isUserLoading ? (
        <div className={styles.center}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <h2 className={styles.contactTitle}>Let’s Get in Touch</h2>
          <p className={styles.contactSubTitle}>
            I’d love to connect! Whether you have a question, want to collaborate,
            or just say hi — feel free to reach out through any of the options below.
          </p>

          <motion.div
            className={styles.contactsGrid}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                className={styles.contactCard}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.97 }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              >
                <NavLink
                  to={contact.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactLink}
                >
                  <span className={styles.icon}>{contact.getLogo()}</span>
                  <span className={styles.text}>{contact.title}</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Contact;
