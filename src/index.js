const MAP = createMap("SB");
toggleMap(MAP);

firebase.auth().onAuthStateChanged(isLogin => {
  loginButton("login", "login-popup", isLogin);
  if (isLogin) {
    console.log("Hello, user ", isLogin.uid);

    MAP.setNewMarker();
  } else {
    //
  }
});
