import { server } from '../store';
import axios from 'axios';


  export const createCourse = (formData) => async (dispatch) => {
    try {
      dispatch({ type: 'createCourseRequest' });

      const config = {
        headers: {
            'Content-type': 'multipart/form-data'
        },
        withCredentials: true
      };
  
      const { data } = await axios.post(
        `${server}/createcourse`,
        formData,
        config
      );

      dispatch({ type: 'createCourseSuccess', payload: data.message });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'createCourseFail', payload: error.response.data.message });
    }
  };

  export const deleteCourse = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'deleteCourseRequest' });

      const config = {
        withCredentials: true
      };
  
      const { data } = await axios.delete(
        `${server}/course/${id}`,
        config
      );

      dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'deleteCourseFail', payload: error.response.data.message });
    }
  };

  export const addLecture = (id,formData) => async (dispatch) => {
    try {
      dispatch({ type: 'addLectureRequest' });

      const config = {
        headers: {
            'Content-type': 'multipart/form-data'
        },
        withCredentials: true
      };
  
      const { data } = await axios.post(
        `${server}/course/${id}`,
        formData,
        config
      );

      dispatch({ type: 'addLectureSuccess', payload: data.message });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'addLectureFail', payload: error.response.data.message });
    }
  };

  export const deleteLecture = (courseId,lectureId) => async (dispatch) => {
    try {
      dispatch({ type: 'deleteLectureRequest' });

      const config = {
        withCredentials: true
      };
  
      const { data } = await axios.delete(
        `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
        config
      );

      dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'deleteLectureFail', payload: error.response.data.message });
    }
  };

  export const getAllUserss = () => async (dispatch) => {
    try {
      dispatch({ type: 'getAllUsersRequest' });

      const config = {
        withCredentials: true
      };
  
      const { data } = await axios.get(
        `${server}/admin/users`,
        config
      );
      dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'getAllUsersFail', payload: error.response.data.message });
    }
  };

  export const updateUserRole = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'updateUserRoleRequest' });

      const config = {
        withCredentials: true
      };
  
      const { data } = await axios.put(
        `${server}/admin/user/${id}`,
        {},
        config
      );
      dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'updateUserRoleFail', payload: error.response.data.message });
    }
  };

  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'deleteUserRequest' });

      const config = {
        withCredentials: true
      };
  
      const { data } = await axios.delete(
        `${server}/admin/user/${id}`,
        config
      );
      dispatch({ type: 'deleteUserSuccess', payload: data.message });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'deleteUserFail', payload: error.response.data.message });
    }
  };

  export const getDashboardStats = () => async (dispatch) => {
    try {
      dispatch({ type: 'getAdminStatsRequest' });

      const config = {
        withCredentials: true
      };
  
      const { data } = await axios.get(
        `${server}/admin/stats/`,
        config
      );
      dispatch({ type: 'getAdminStatsSuccess', payload: data });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'getAdminStatsFail', payload: error.response.data.message });
    }
  };


  


