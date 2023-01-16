document.getElementById("darkmode").checked =
  localStorage.darkmode == "dark" ? true : false;

function save() {
  let instanceUrl = document.getElementById("instanceurl").value;
  if (instanceUrl.endsWith("/")) {
    alert("Server URL must not end with a '/'!");
    return;
  }
  localStorage.instanceurl = instanceUrl;
  if (document.getElementById("darkmode").checked) {
    localStorage.darkmode = "dark";
  } else {
    localStorage.darkmode = "light";
  }
  location = "index.html";
}
