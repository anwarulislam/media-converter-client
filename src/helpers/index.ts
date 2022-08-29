export const injectAssets = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "//cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css";
  document.head.appendChild(link);
  const script = document.createElement("script");
  script.src = "//cdn.jsdelivr.net/npm/toastify-js";
  document.head.appendChild(script);
};
