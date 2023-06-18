import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import { TestingSlice } from "entities/Testing";
import { TestsSlice, testsApi  } from "entities/Tests";     
import { UserSlice } from "entities/User";
import { PopupsSlice } from "entities/Popups/redux/PopupsSlice";
import { TeacherTestsSlice } from "entities/TeacherTests";
import { TestCreationSlice } from "entities/TestCreation";
import { ClassesSlice, classesApi } from "entities/Classes";
import { ResultsSlice } from "entities/Results/ResultsSlice";
import { NewQuestionCreateReducer } from "entities/NewQuestionCreate";
import { userApi } from "entities/User/api/UserApi";
import { testCreationApi } from "entities/TestCreation";
import { TestResultSlice, testResultApi } from "entities/TestResult";



const TestsReducer = TestsSlice.reducer
const TestingReducer = TestingSlice.reducer
const UserReducer = UserSlice.reducer
const PopupsReducer = PopupsSlice.reducer
const TestResultReducer = TestResultSlice.reducer
const TeacherTestsReducer = TeacherTestsSlice.reducer
const TestCreationReducer = TestCreationSlice.reducer
const ClassesReducer = ClassesSlice.reducer
const ResultsReducer = ResultsSlice.reducer
 

const rootReducer = combineReducers({
    tests: TestsReducer,
    testing: TestingReducer,
    user: UserReducer,
    popups: PopupsReducer,
    testResult: TestResultReducer,
    TeacherTests: TeacherTestsReducer,
    testCreation: TestCreationReducer,
    classes: ClassesReducer,
    results: ResultsReducer,
    newQuestionCreate: NewQuestionCreateReducer,
    [userApi.reducerPath]: userApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
    [testCreationApi.reducerPath]: testCreationApi.reducer,
    [testResultApi.reducerPath]: testResultApi.reducer,
})


const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
      [userApi.reducerPath],
      [classesApi.reducerPath],
      [testsApi.reducerPath],
      [testCreationApi.reducerPath],
      [testResultApi.reducerPath],
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)




export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    .concat(userApi.middleware)
    .concat(classesApi.middleware)
    .concat(testsApi.middleware)
    .concat(testCreationApi.middleware)
    .concat(testResultApi.middleware)
  })

export const persistor = persistStore(store)


