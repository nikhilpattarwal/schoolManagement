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
            console.log(type);
            const payload = action.payload.payload;
            console.log(payload);

            if(!state[type][payload.grade]){
                state[type][payload.grade] =[] 
            }
            state.students[payload.grade] = [payload , ...state.students[payload.grade]]; 

            console.log(JSON.parse(JSON.stringify(state.students)));
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
                const {classss,id} = action.payload;
                console.log("id",id,classss);

                 const index = state.classes?.[classss]?.findIndex((cls) => cls.id === id);
                 console.log(index);
                 if(index === -1 ||  typeof index === "undefined"){
                    if (!state.classes[classss]) {
                        state.classes[classss] = [];
                    }
                     state.classes[classss] = [action.payload, ... state.classes[classss]];
                     console.log(JSON.parse(JSON.stringify(state.classes)));
                 }   
            },
            DELETE:(state,action)=>{
                const {id,classss} = action.payload;
                console.log("payload",id,classss);
                state.classes[classss] = state.classes[classss].filter((cls) => cls.id !== id);
            },
            },
            
        }
    )

    export const  dataReducer = mainSlice.reducer;
    export const dataActions = mainSlice.actions;
    export const dataSelector = (state)=> state.dataReducer;