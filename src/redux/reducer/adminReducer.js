import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
    {},
    {

      getAdminStatsRequest: state => {
        state.loading = true;
      },
      getAdminStatsSuccess: (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.usersCount = action.payload.usersCount;
        state.subscriptionsCount = action.payload.subscriptionsCount;
        state.viewsCount = action.payload.viewsCount;
        state.usersPercent = action.payload.usersPercent;
        state.subscriptionsPercent = action.payload.subscriptionsPercent;
        state.viewsPercent = action.payload.viewsPercent;
        state.usersProfit = action.payload.usersProfit;
        state.subscriptionsProfit = action.payload.subscriptionsProfit;
        state.viewsProfit = action.payload.viewsProfit;
      },
      getAdminStatsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      createCourseRequest: state => {
        state.loading = true;
      },
      createCourseSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      createCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      addLectureRequest: state => {
        state.loading = true;
      },
      addLectureSuccess: (state, action) => {
        state.loading = false;
        state.lecture = action.payload;
      },
      addLectureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      deleteLectureRequest: state => {
        state.loading = true;
      },
      deleteLectureSuccess: (state, action) => {
        state.loading = false;
        state.lecture = action.payload;
      },
      deleteLectureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      getAllUsersRequest: state => {
        state.loading = true;
      },
      getAllUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
      },
      getAllUsersFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      updateUserRoleRequest: state => {
        state.loading = true;
      },
      updateUserRoleSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      updateUserRoleFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      deleteUserRequest: state => {
        state.loading = true;
      },
      deleteUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      deleteUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },


      clearError: state => {
        state.error = null;
      },
  
      clearMessage: state => {
        state.message = null;
      },
    }
  );
  