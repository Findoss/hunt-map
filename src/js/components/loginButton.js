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
