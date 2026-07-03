// ===========================================================
// EDIT THESE FOUR LINES with your real bot details, then every
// button/link across the site updates automatically.
// ===========================================================
const NYX_CONFIG = {
  inviteUrl: "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID",
  supportUrl: "https://discord.gg/YOUR_INVITE_CODE",
  voteUrl: "https://top.gg/bot/YOUR_CLIENT_ID/vote",
  clientId: "YOUR_CLIENT_ID",
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-invite]").forEach((el) => (el.href = NYX_CONFIG.inviteUrl));
  document.querySelectorAll("[data-support]").forEach((el) => (el.href = NYX_CONFIG.supportUrl));
  document.querySelectorAll("[data-vote]").forEach((el) => (el.href = NYX_CONFIG.voteUrl));
});
