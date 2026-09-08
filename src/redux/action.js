import { ACTIONS } from "./constant";

import {
  getCertificates,
  addCertificate as addCertificateInServer,
  deleteCertificate as deleteCertificateInServer,
} from "../api/certificate.js";
import {
  getEducations,
  addEducation as addEducationInServer,
  deleteEducation as deleteEducationInServer,
} from "../api/education.js";
import {
  getExperiences,
  addExperience as addExperienceServer,
  deleteExperience as deleteExperienceInServer,
} from "../api/experience.js";
import {
  getProjects,
  addProject as addProjectInServer,
  deleteProject as deleteProjectInServer,
} from "../api/project.js";
import {
  getSkills,
  addSkills as addSkillInServer,
  deleteSkill as deleteSkillInServer,
} from "../api/skill.js";
import {} from "../api/user.js";
import {
  getUser as getUserFromDB,
  addOrUpdateUser as addOrUpdateUserInServer,
} from "../api/user.js";

const getAllProjects = (user_id) => async (dispatch) => {
  if (!user_id) return;
  dispatch({
    type: ACTIONS.LOADING_PROJECTS,
  });

  const projects = await getProjects(user_id);

  dispatch({
    type: ACTIONS.PROJECTS_LOADED,
    payload: projects,
  });
};

const getAllCertificates = (user_id) => async (dispatch) => {
  if (!user_id) return;
  dispatch({
    type: ACTIONS.LOADING_CERTIFICATES,
  });

  const certificates = await getCertificates(user_id);

  dispatch({
    type: ACTIONS.CERTIFICATES_LOADED,
    payload: certificates,
  });
};

const setUserFromGoogle = (user) => async (dispatch) => {
  dispatch({
    type: ACTIONS.USER_FROM_GOOGLE,
    payload: user,
  });
};

const setUserFromUrl = (user_email) => async (dispatch) => {
  dispatch({
    type: ACTIONS.USER_FROM_URL,
    payload: user_email,
  });
};

const getAllSkills = (user_id) => async (dispatch) => {
  if (!user_id) return;
  dispatch({
    type: ACTIONS.LOADING_SKILLS,
  });

  const skills = await getSkills(user_id);

  dispatch({
    type: ACTIONS.SKILLS_LOADED,
    payload: skills,
  });
};

const getAllEducations = (user_id) => async (dispatch) => {
  if (!user_id) return;
  dispatch({
    type: ACTIONS.LOADING_EDUCATIONS,
  });

  const educations = await getEducations(user_id);

  dispatch({
    type: ACTIONS.EDUCATIONS_LOADED,
    payload: educations,
  });
};

const getUser = (user_email, name) => async (dispatch) => {
  dispatch({
    type: ACTIONS.LOADING_USER,
  });
  try {
    const user = await getUserFromDB(user_email, name);
    dispatch(getAllCertificates(user?.id));
    dispatch(getAllProjects(user?.id));
    dispatch(getAllSkills(user?.id));
    dispatch(getAllEducations(user?.id));
    dispatch(getAllExperiences(user?.id));
    dispatch({
      type: ACTIONS.USER_LOADED,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.USER_NOT_FOUND,
    });
  }
};

const getAllExperiences = (user_id) => async (dispatch) => {
  if (!user_id) return;
  dispatch({
    type: ACTIONS.LOADING_WORKEXPERIENCES,
  });

  const experiences = await getExperiences(user_id);

  dispatch({
    type: ACTIONS.WORKEXPERIENCES_LOADED,
    payload: experiences,
  });
};

const addDummySkill = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_DUMMY_SKILL,
    payload: {
      mui_id: mui_id,
      skill_name: "",
      skill_category: "",
      skill_proficiency: 0,
      isNew: true,
    },
  });
};

const removeDummySkill = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_DUMMY_SKILL,
    payload: mui_id,
  });
};

const removeDummyCertificate = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_DUMMY_CERTIFICATE,
    payload: mui_id,
  });
};

const removeDummyProject = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_DUMMY_PROJECT,
    payload: mui_id,
  });
};

const removeDummyEducation = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_DUMMY_EDUCATION,
    payload: mui_id,
  });
};

const removeDummyExperience = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_DUMMY_EXPERIENCE,
    payload: mui_id,
  });
};

const addSkill = (new_row, user_id) => async (dispatch) => {
  try {
    await addSkillInServer(new_row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, skills updated.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message: error?.message || "Something went wrong while saving skill",
      },
    });
  }
  const skills = await getSkills(user_id);
  dispatch({
    type: ACTIONS.SKILLS_LOADED,
    payload: skills,
  });
};

const deleteSkill = (row, user_id) => async (dispatch) => {
  try {
    await deleteSkillInServer(row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, skills deleted.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message: error?.message || "Something went wrong while deleting skill.",
      },
    });
  }
  const skills = await getSkills(user_id);
  dispatch({
    type: ACTIONS.SKILLS_LOADED,
    payload: skills,
  });
};

const addDummyCertificate = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_DUMMY_CERTIFICATE,
    payload: {
      mui_id: mui_id,
      certificate_name: "",
      certificate_description: "",
      certification_authority: "",
      certification_date: null,
      certification_expiry: null,
      verification_url: "",
      technology_tags: null,
      isNew: true,
    },
  });
};

const addCertificate = (new_row, user_id) => async (dispatch) => {
  try {
    await addCertificateInServer(new_row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, certificate updated.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message:
          error?.message || "Something went wrong while saving certificate",
      },
    });
  }
  const certificates = await getCertificates(user_id);
  dispatch({
    type: ACTIONS.CERTIFICATES_LOADED,
    payload: certificates,
  });
};

const deleteCertificate = (row, user_id) => async (dispatch) => {
  try {
    await deleteCertificateInServer(row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, certificate deleted.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message:
          error?.message || "Something went wrong while deleting certificate.",
      },
    });
  }
  const certificates = await getCertificates(user_id);
  dispatch({
    type: ACTIONS.CERTIFICATES_LOADED,
    payload: certificates,
  });
};

const addDummyEducation = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_DUMMY_EDUCATION,
    payload: {
      mui_id: mui_id,
      institute_name: "",
      degree_name: "",
      start_date: null,
      end_date: null,
      score: "",
      isNew: true,
    },
  });
};

const addEducation = (new_row, user_id) => async (dispatch) => {
  try {
    await addEducationInServer(new_row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, education updated.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message:
          error?.message || "Something went wrong while saving education",
      },
    });
  }
  const educations = await getEducations(user_id);
  dispatch({
    type: ACTIONS.EDUCATIONS_LOADED,
    payload: educations,
  });
};

const deleteEducation = (row, user_id) => async (dispatch) => {
  try {
    await deleteEducationInServer(row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, education deleted.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message:
          error?.message || "Something went wrong while deleting education.",
      },
    });
  }
  const educations = await getEducations(user_id);
  dispatch({
    type: ACTIONS.EDUCATIONS_LOADED,
    payload: educations,
  });
};

const addDummyExperience = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_DUMMY_EXPERIENCE,
    payload: {
      mui_id: mui_id,
      company_name: "",
      designation: "",
      start_date: null,
      end_date: null,
      details: "",
      isNew: true,
    },
  });
};

const addExperience = (new_row, user_id) => async (dispatch) => {
  try {
    await addExperienceServer(new_row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, experience updated.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message:
          error?.message || "Something went wrong while saving work experience",
      },
    });
  }
  const experiences = await getExperiences(user_id);
  dispatch({
    type: ACTIONS.WORKEXPERIENCES_LOADED,
    payload: experiences,
  });
};

const deleteExperience = (row, user_id) => async (dispatch) => {
  try {
    await deleteExperienceInServer(row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, work experience deleted.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message:
          error?.message ||
          "Something went wrong while deleting work experience.",
      },
    });
  }
  const experiences = await getExperiences(user_id);
  dispatch({
    type: ACTIONS.WORKEXPERIENCES_LOADED,
    payload: experiences,
  });
};

const setOpenSnackBar = (value, message) => async (dispatch) => {
  dispatch({
    type: ACTIONS.SHOW_SNACKBAR,
    payload: {
      value: value,
      severity: "error",
      message: message,
    },
  });
};

const addProject = (new_row, user_id) => async (dispatch) => {
  try {
    await addProjectInServer(new_row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, project updated.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message:
          error?.message || "Something went wrong while updating project",
      },
    });
  }
  const projects = await getProjects(user_id);
  dispatch({
    type: ACTIONS.PROJECTS_LOADED,
    payload: projects,
  });
};

const addDummyProject = (mui_id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_DUMMY_PROJECT,
    payload: {
      mui_id: mui_id,
      project_name: "",
      project_description: "",
      github_url: "",
      web_url: null,
      play_store_url: "",
      technology_tags: null,
      isNew: true,
    },
  });
};

const deleteProject = (row, user_id) => async (dispatch) => {
  try {
    await deleteProjectInServer(row, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, project deleted.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message:
          error?.message ||
          "Something went wrong while deleting work experience.",
      },
    });
  }
  const projects = await getProjects(user_id);

  dispatch({
    type: ACTIONS.PROJECTS_LOADED,
    payload: projects,
  });
};

const updateUser = (updatedUser, user_id) => async (dispatch) => {
  try {
    await addOrUpdateUserInServer(updatedUser, user_id);
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "success",
        message: "Success, user updated.",
      },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.SHOW_SNACKBAR,
      payload: {
        value: true,
        severity: "error",
        message: error?.message || "Something went wrong while updating user.",
      },
    });
  }
  const user = await getUserFromDB(updatedUser.user_email, null);
  dispatch({
    type: ACTIONS.USER_LOADED,
    payload: user,
  });
};

export {
  setUserFromGoogle,
  getAllProjects,
  getAllCertificates,
  getAllSkills,
  getAllEducations,
  getUser,
  getAllExperiences,
  addDummySkill,
  addSkill,
  deleteSkill,
  addDummyCertificate,
  addCertificate,
  deleteCertificate,
  addDummyEducation,
  addEducation,
  deleteEducation,
  setOpenSnackBar,
  addDummyExperience,
  addExperience,
  deleteExperience,
  addProject,
  addDummyProject,
  deleteProject,
  updateUser,
  removeDummySkill,
  removeDummyExperience,
  removeDummyCertificate,
  removeDummyEducation,
  removeDummyProject,
  setUserFromUrl,
};
