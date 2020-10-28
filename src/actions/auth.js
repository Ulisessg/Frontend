import Swal from "sweetalert2";
import { fetchWithoutToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken("user/login", { email, password }, "POST");
    const body = await resp.json();    
    if (resp.status === 200) {
      localStorage.setItem("token", body.data.token);

      dispatch(
        login({
          uid: body.data.id,
          name: body.data.name,
          country: body.data.country,
          isAdmin: body.data.isAdmin,
        })
      )
      
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const logout = () => ({
  type: types.authLogout,
  payload: {
    checking: true,
    uid: null,
    name: null,
    isAdmin: null,
  },
});

export const startRegister = (
  firstName,
  lastName,
  email,
  country,
  password,
  confirmPassword
) => {
  if (password !== confirmPassword) {
    return async () => {
      Swal.fire(
        "AlwaysNews",
        "Please verify that the password is the same",
        "success"
      );
    };
  } else {
    return async () => {
      const resp = await fetchWithoutToken(
        "user/signup",
        { firstName, lastName, email, country, password },
        "POST"
      );
      const body = await resp.json();
      if (resp.status === 200) {
        Swal.fire("AlwaysNews", body.message, "success");
      } else {
        Swal.fire("Error", body.message, "error");
      }
    };
  }
};
