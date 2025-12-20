import { createSlice } from "@reduxjs/toolkit";

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    account?: string
}

const initialState: {
    user?: User,
    token: string,

} = {
    user: undefined,
    token: localStorage.getItem("token") || "",

}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        deleteToken(state) {
            state.token = "";
            localStorage.removeItem("token");
        },

    }
})

export const { setUser, setToken, deleteToken } = userSlice.actions
export default userSlice.reducer;