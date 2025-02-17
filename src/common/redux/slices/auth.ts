import { AuthState } from "@/common/types/redux_initialstate_types";
import { createSlice } from "@reduxjs/toolkit";

// thunk

// slice
const initialAuth: AuthState = {
    openAuthBox: false,
    session: null,
}

const auth = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload
        },
        openAuth: (state) => {
            state.openAuthBox = true;
        }
    },
    extraReducers: (builder) => {

    }
})
export const { setSession, openAuth } = auth.actions
export default auth.reducer;