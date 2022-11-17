import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
	loading: boolean;
	message: string;
	error: string;
};

const initialState: InitialState = {
	loading: false,
	message: "",
	error: "",
};

export const uploadNewImageMethod = createAsyncThunk(
	"uploadNewImage/uploadNewImageMethod",
	async () => {
		return await axios.get("uploadNewImage").then(({ data }) => {
			return data;
		});
	}
);

const uploadNewImageSlice = createSlice({
	name: "uploadNewImage",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(uploadNewImageMethod.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(uploadNewImageMethod.fulfilled, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
		});
		builder.addCase(uploadNewImageMethod.rejected, (state, action) => {
			state.loading = false;
			state.error =
				action.error.message || "Something happened whiles uploading image";
		});
	},
});

export default uploadNewImageSlice.reducer;
