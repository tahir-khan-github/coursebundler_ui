import { server } from '../store';
import axios from 'axios';


  export const getAllCourses = (keyword='',category='') => async (dispatch) => {
    try {
      dispatch({ type: 'allCourseRequest' });
  
      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`,
      );
      dispatch({ type: 'allCourseSuccess', payload: data.courses });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'allCourseFail', payload: error.response.data.message });
    }
  };

  export const getCourseLectures = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'getCourseRequest' });
  
      const { data } = await axios.get(
        `${server}/course/${id}`,
        {
          withCredentials: true
        }
      );
      dispatch({ type: 'getCourseSuccess', payload: data.lectures });
  
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'getCourseFail', payload: error.response.data.message });
    }
  };


  


