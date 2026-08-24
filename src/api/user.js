import { base_url } from "./api";
import Cookies from "js-cookie";

const loadUser = async () => {
  const response = await fetch(`${base_url}/login/success`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://portfolio.rsaw409.me",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Something went wrong");
  }
};

const getUser = async (user_email, name) => {
  const url = `${base_url}/user?user_email=${user_email}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { ...(name && { name: name }) },
  });
  const user = await response.json();
  return user;
};

const addOrUpdateUser = async (user, user_id) => {
  const formData = new FormData();

  formData.append("profile_pic", user.profile_url);
  formData.append("user_email", user.user_email);
  formData.append("name", user.name);
  formData.append("about", user.about);

  formData.append("github_url", user.social_links.github_url);
  formData.append("linkedin_url", user.social_links.linkedin_url);
  formData.append("blog_url", user.social_links.blog_url);
  formData.append("twitter_url", user.social_links.twitter_url);
  formData.append("stackoverflow_url", user.social_links.stackoverflow_url);
  formData.append("leetcode_url", user.social_links.leetcode_url);

  const url = `${base_url}/user?user_id=${user_id}`;

  const csrf_token = Cookies.get("XSRF-TOKEN");
  console.log("csrf_token", csrf_token);
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "X-XSRF-TOKEN": csrf_token,
    },
    credentials: "include",
    body: formData,
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(await response.json());
  }
};

export { getUser, addOrUpdateUser, loadUser };
