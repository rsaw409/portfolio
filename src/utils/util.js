function groupBy(array, callbackFn) {
  let obj = {};
  for (let each of array) {
    let tmp = callbackFn(each);
    if (!obj.hasOwnProperty(tmp)) {
      obj[tmp] = [];
    }
    obj[tmp].push(each);
  }
  return obj;
}

function transformSkills(skills) {
  if (Array.isArray(skills)) {
    let tmp = groupBy(skills, ({ skill_category }) => skill_category);
    return Object.keys(tmp).map((skill_category) => {
      return {
        skill_category: skill_category,
        skills: tmp[skill_category].sort(
          (a, b) => b.skill_proficiency - a.skill_proficiency,
        ),
      };
    });
  } else {
    return skills;
  }
}

function formatDateYYYYMMDD(date) {
  if (!(date instanceof Date)) return date;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateTemporal(dateString, format) {
  const temporalDate = Temporal.PlainDate.from(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  switch (format) {
    case "DD/MM/YYYY":
      return `${String(temporalDate.day).padStart(2, "0")}/${String(temporalDate.month).padStart(2, "0")}/${temporalDate.year}`;
    case "MM/YYYY":
      return `${String(temporalDate.month).padStart(2, "0")}/${temporalDate.year}`;
    case "MMM YYYY":
      return `${monthNames[temporalDate.month - 1]} ${temporalDate.year}`;
    case "YYYY-MM":
      return `${temporalDate.year}-${String(temporalDate.month).padStart(2, "0")}`;
    default:
      return temporalDate.toString();
  }
}

function generateUrl(currentPath, email, isLoggedIn) {
  const userId = email.split("@")[0];

  const parts = currentPath.split("/").filter(Boolean);
  if (parts.length === 0) {
    return { path: `${userId}/about`, email: email };
  }

  if (
    [
      "about",
      "workexperience",
      "certification",
      "projects",
      "contacts",
    ].includes(parts[0])
  ) {
    return {
      path: `${userId}/${parts.slice(0).join("/")}`,
      email: `${userId}@gmail.com`,
    };
  }

  let mayBeEmail = isLoggedIn ? userId : parts[0];
  if (!mayBeEmail.includes("@gmail.com")) {
    mayBeEmail = mayBeEmail + "@gmail.com";
  }
  const maybeUserId = mayBeEmail?.split("@")?.[0];
  return {
    path: `${maybeUserId}/${parts.length > 1 ? parts.slice(1).join("/") : "about"}`,
    email: mayBeEmail,
  };
}

export {
  groupBy,
  transformSkills,
  formatDateYYYYMMDD,
  generateUrl,
  formatDateTemporal,
};
