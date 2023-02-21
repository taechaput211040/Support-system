export function set_login(state, payload) {
  const { key ,username} = payload;
  state.key = key;
  state.user = payload.username
  localStorage.setItem("key", key);
  localStorage.setItem("username", username);
}

export function set_website(state, payload) {
  
  state.website = payload;
  
  localStorage.setItem("website", payload);
}
