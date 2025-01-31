import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // to store cookies in browser
      }
    );
    console.log(data);

    dispatch({ type: 'loginSuccess', payload: data });

  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get( `${server}/me`, { withCredentials: true });
    console.log(data);

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.post( `${server}/logout`, { withCredentials: true });

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(
      `${server}/register`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // to store cookies in browser
      }
    );
    console.log(data);

    dispatch({ type: 'registerSuccess', payload: data });

  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};


