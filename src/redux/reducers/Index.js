const InitialState = [[],[]];

const rootReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'SET_DATA': 
            console.log('here')
            let newState = [...Array(2)];
            newState[0] = action.payload;
            newState[1] = state[1]
            console.log('newState', newState)
            state = newState;
            return state;
        case 'ADD_TO_STALK':
            let newStalkArr = [...Array(2)]
            newStalkArr[0] = state[0];
            newStalkArr[1] = state[1];
            newStalkArr[1].push(action.payload);
            state = newStalkArr
            return state;
        case 'REM_FROM_STALK': 
            const newUpdateArr = state[1].filter((id,index)=>{
                return (action.payload!==id);
            })
            state[1] = newUpdateArr
            return state;
        default: return state;
    }
}

export default rootReducer