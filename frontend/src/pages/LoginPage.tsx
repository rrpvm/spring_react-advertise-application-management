import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppAPI from "../API/APIRequests";
import { jwtState } from "../store/reducers/jwtTokenReducer";

export const LoginPage: React.FC = () => {
    const disp = useDispatch();
    const jwt = useSelector<jwtState, string>((state) => state.jwtToken);
    const handleFormSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const jwtResponce = await AppAPI.authenticate(login, password, jwt);
        disp({ type: "SET_TOKEN", payload: jwtResponce });
        console.log(jwtResponce);
    }
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    return (
        <div className="container" style={{marginTop:"15px"}}>
            <h2>Authorization form</h2>
            <form method="post" onSubmit={(e) => {
                handleFormSend(e);
            }}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">login</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="login help" placeholder="Enter login" value={login} onChange={handleLoginChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <span>current jwt token : {jwt}</span>
        </div >
    )
}

