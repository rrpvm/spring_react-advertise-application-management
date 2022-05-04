export interface jwtState {
    jwtToken: string,
}
type Action = {
    type: "SET_TOKEN",
    payload: string,
}
export const jwtReducer = (prevState: jwtState = {jwtToken:""}, action: Action) => {
    switch (action.type) {
        case "SET_TOKEN": {
                return {prevState , jwtToken : action.payload};//
        }
        default: {
            return prevState;
        }
    }
}