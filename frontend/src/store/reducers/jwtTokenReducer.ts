
interface jwtState {
    jwtToken: string,
}
const initialJwtState = {
    jwtToken: ''
}
type Action = {
    type: "SET_TOKEN",
    payload: "string",
}
export const jwtReducer = (prevState: jwtState = initialJwtState, action: Action) => {
    switch (action.type) {
        case "SET_TOKEN": {
                return { prevState, jwtToken : action.payload}
        }
        default: {
            return prevState;
        }
    }
}