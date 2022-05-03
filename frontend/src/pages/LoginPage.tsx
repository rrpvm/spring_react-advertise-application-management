import axios from "axios";
import { useState } from "react";
import AppAPI from "../API/APIRequests";


export const LoginPage: React.FC = () => {
    const handleFormSend = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const headers = {
            //'Authorization' : 'Bearer  ',
        }
        let config = {
            headers,
        }

        axios.post('http://localhost:8080/authenticate', {
            'login': login,
            'password': password
        }, config).then(data => {
            //dispatch(changeEmail({ email: data.data }));
        }
        );

    }
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    return (
        <div className="container">
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
        </div >
    )
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
