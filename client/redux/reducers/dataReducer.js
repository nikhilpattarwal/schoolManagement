    import { createSlice } from "@reduxjs/toolkit";

    const initialState={
        classes:{},
        students:{},
        dailyAttendance:{},
    }

    const mainSlice = createSlice({
        name:'data',
        initialState,
        reducers:{
            ADD:(state, action)=>{
            const  type = action.payload.type;
            const payload = action.payload.payload;
            state[type] = [payload , ...state[type]]; 
            },
            ADD_ATTENDANCE:(state,action)=>{
                const { classs, month, payload } = action.payload;

                if (!state.dailyAttendance) {
                state.dailyAttendance = {};
                }
                if (!state.dailyAttendance[classs]) {
                state.dailyAttendance[classs] = {};
                }
                if (!state.dailyAttendance[classs][month]) {
                state.dailyAttendance[classs][month] = [];
                }

                state.dailyAttendance[classs][month] = [payload, ...state.dailyAttendance[classs][month]];
            },
            ADD_CLASSES:(state,action)=>{
                console.log(action.payload);
                const {classss} = action.payload;
                if (!state.classes[classss]) {
                    state.classes[classss] = [];
                    }
                state.classes[classss] = [action.payload, ... state.classes[classss]];
                console.log(JSON.parse(JSON.stringify(state.classes)));
            }
            },
            DELETE:(state,action)=>{

            },
            UPDATE:(state,action)=>{
                
            }
        }
    )

    export const  dataReducer = mainSlice.reducer;
    export const dataActions = mainSlice.actions;
    export const dataSelector = (state)=> state.dataReducer;