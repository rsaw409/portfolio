// In production the backend (portfolio-backend-app-267y.onrender.com) is
// reached through a Render rewrite `/api/*` -> `.../portfolio/*` on this site's
// own domain, so its session and XSRF cookies are first-party.
let base_url =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:3000/portfolio";

export { base_url };
