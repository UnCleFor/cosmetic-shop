import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Login thành công
        loginSuccess(state, action) {
            const { user, accessToken } = action.payload;

            state.user = user;
            state.accessToken = accessToken;
        },

        // Refresh token
        refreshSuccess(state, action) {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },

        // Logout
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },

        // Cập nhật 
        updateUser(state, action) {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
    },
});

export const {
    loginSuccess,
    refreshSuccess,
    logout,
    updateUser
} = userSlice.actions;

export default userSlice.reducer;