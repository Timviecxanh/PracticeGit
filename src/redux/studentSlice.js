import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentsData: [],
  studentEditing: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.studentsData.push(action.payload);
    },

    deleteStudent: (state, action) => {
      state.studentsData = state.studentsData.filter(
        (sv) => sv.maSV !== action.payload
      );
    },

    setEditing: (state, action) => {
      state.studentEditing = action.payload;
    },

    updateStudent: (state, action) => {
      let index = state.studentsData.findIndex(
        (sv) => sv.maSV === action.payload.maSV
      );
      if (index !== -1) {
        state.studentsData[index] = action.payload;
      }
      state.studentEditing = null;
    },
  },
});

export const { addStudent, deleteStudent, setEditing, updateStudent } =
  studentSlice.actions;

export default studentSlice.reducer;
