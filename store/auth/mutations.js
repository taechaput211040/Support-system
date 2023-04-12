export function set_login(state, payload) {
  const { access_token, username } = payload;
  state.key = access_token;
  state.user = username;
  localStorage.setItem("key", access_token);
  localStorage.setItem("username", username);
}

export function set_website(state, payload) {
  state.website = payload;
}
