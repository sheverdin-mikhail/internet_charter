import { ClassesSlice } from "./ClassesSlice"


export const saveStudentAction = (input) => async (dispatch) =>  {
    dispatch((ClassesSlice.actions.saveStudent(input)))
    dispatch(ClassesSlice.actions.removeEditionalClass())
    dispatch(ClassesSlice.actions.removeEditionalSudent())
}
export const editStudentAction = (data) => async (dispatch) =>  {
    dispatch((ClassesSlice.actions.editStudent(data)))
    dispatch(ClassesSlice.actions.removeEditionalClass())
    dispatch(ClassesSlice.actions.removeEditionalSudent())
}