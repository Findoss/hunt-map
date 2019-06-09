function loginButton(idElBtn = "login", idElPopup = "login-popup", isLogin) {
  const button = document.getElementById(idElBtn);

  if (isLogin) button.innerHTML = "logout";
  else button.innerHTML = "login";

  button.onclick = e => {
    if (isLogin) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          button.innerHTML = "login";
        });
    } else {
      var x = document.getElementById(idElPopup);
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
  };
}

function authorList(idEl = "contributors", idElPopup = "contributors-popup") {
  const el = document.getElementById(idEl);
  const elPopup = document.getElementById(idElPopup);
  elPopup.innerText = contributorNames;
  el.onmouseover = e => {
    elPopup.style.display = "block";
  };
  el.onmouseout = e => {
    elPopup.style.display = "none";
  };
}
