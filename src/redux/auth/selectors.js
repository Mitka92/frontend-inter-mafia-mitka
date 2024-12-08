//селектори
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthIsRegisteredSuccess = (state) =>
  state.auth.isRegisteredSuccess;
export const selectAuthIsLoading = (state) => state.auth.isLoading;
export const selectAllUsers = (state) => state.auth.count;
export const selectIsRefreshing =(state)=>state.auth.isRefreshing;
