import { useState } from "react";
import {
  faUserCircle,
  faCog,
  faGraduationCap,
  faEnvelope,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import {
  faStackOverflow,
  faTwitter,
  faGithub,
  faLinkedin,
  faLeetcode,
} from "@fortawesome/free-brands-svg-icons";
import ErrorPage from "../ErrorPage/index.jsx";
import { transformSkills } from "../../utils/util.js";

import styles from "./index.module.css";

const About = () => {
  let {
    isEducationLoading,
    educations,
    isSkillsLoading,
    skills,
    isUserLoading,
    user,
    isValidView,
  } = useSelector((state) => ({
    isEducationLoading: state.isEducationLoading,
    educations: state.educations,

    isSkillsLoading: state.isSkillsLoading,
    skills: transformSkills(state.skills),

    isUserLoading: state.isUserLoading,
    user: state.user,
    isValidView: state.isValidView,
  }));

  const profile_url = user?.profile_url;
  const about = user?.about;
  const email = user?.user_email;
  const linkedin_url = user?.social_links?.linkedin_url;
  const github_url = user?.social_links?.github_url;
  const blog_url = user?.social_links?.blog_url;
  const twitter_url = user?.social_links?.twitter_url;
  const stackoverflow_url = user?.social_links?.stackoverflow_url;
  const leetcode_url = user?.social_links?.leetcode_url;

  const [hover, setHover] = useState({
    education: false,
    skill: false,
  });

  const socialLinks = {
    github: { icon: faGithub, url: github_url },
    linkedin: { icon: faLinkedin, url: linkedin_url },
    stackOverFlow: { icon: faStackOverflow, url: stackoverflow_url },
    blog: { icon: faBlog, url: blog_url },
    twitter: { icon: faTwitter, url: twitter_url },
    leetcode: { icon: faLeetcode, url: leetcode_url },
    mail: { icon: faEnvelope, url: `mailto:${email}` },
  };

  if (!isValidView) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className={styles.pageContainer}>
        {/* Profile Section */}
        <motion.div
          className={styles.profileSection}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img className={styles.profileImg} src={profile_url} alt="Profile" />
          <h2 className={styles.userName}>{user?.name}</h2>
          <p className={styles.tagline}>Software Engineer</p>

          <div className={styles.socialLinks}>
            {Object.entries(socialLinks).map(([key, { url, icon }]) =>
              url ? (
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href={url}
                  key={key}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialIcon}
                >
                  <FontAwesomeIcon icon={icon} />
                </motion.a>
              ) : null,
            )}
          </div>
        </motion.div>

        {/* About Card */}
        <div className={styles.cardContainer}>
          <div className={styles.cardTitle}>
            <FontAwesomeIcon icon={faUserCircle} /> <span>About</span>
          </div>
          <div className={styles.cardContent}>
            {isUserLoading ? (
              <div className={styles.center}>
                <CircularProgress />
              </div>
            ) : (
              <p>{about}</p>
            )}
          </div>
        </div>

        {/* Education Timeline */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={styles.cardContainer}
          onMouseEnter={() =>
            setHover((prev) => ({ ...prev, education: true }))
          }
          onMouseLeave={() =>
            setHover((prev) => ({ ...prev, education: false }))
          }
        >
          <div className={styles.cardTitle}>
            <FontAwesomeIcon icon={faGraduationCap} /> <span>Education</span>
          </div>
          {isEducationLoading ? (
            <div className={styles.center}>
              <CircularProgress />
            </div>
          ) : (
            <div className={styles.timeline}>
              {educations.map((each) => (
                <div key={each.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <h4>{each.degree_name}</h4>
                    <p className={styles.institute}>{each.institute_name}</p>
                    <span className={styles.date}>
                      {`${dayjs(each.start_date).format("MM/YYYY")} - ${dayjs(
                        each.end_date,
                      ).format("MM/YYYY")}`}
                    </span>
                    <span className={styles.score}>
                      {each.score > 10 ? each.score / 10 : each.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Skills */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={styles.cardContainer}
          onMouseEnter={() => setHover((prev) => ({ ...prev, skill: true }))}
          onMouseLeave={() => setHover((prev) => ({ ...prev, skill: false }))}
        >
          <div className={styles.cardTitle}>
            <FontAwesomeIcon icon={faCog} /> <span>Skills</span>
          </div>
          {isSkillsLoading ? (
            <div className={styles.center}>
              <CircularProgress />
            </div>
          ) : (
            <div className={styles.skillsWrapper}>
              {skills.map((eachSkill) => (
                <div
                  key={eachSkill.skill_category}
                  className={styles.skillCategory}
                >
                  <h4>{eachSkill.skill_category}</h4>
                  <div className={styles.skillChips}>
                    {eachSkill.skills.map((e) => (
                      <span key={e.skill_name} className={styles.chip}>
                        {e.skill_name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default About;
