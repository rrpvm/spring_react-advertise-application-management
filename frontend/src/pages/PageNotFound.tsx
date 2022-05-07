import { Link } from "react-router-dom"

export const PageNotFound: React.FunctionComponent = () => {
    return (
        <>
            <div style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", marginTop: "20vh" }}>
                <h1> <Link to={"/home"} style={{color:"black",textDecoration:"underline"}} className="page-not-found-text">Something goes wrong</Link></h1>
                <img src="../assets/img/404page.png" style={{ maxWidth: "100%",padding:"2em" }} ></img>
            </div>
        </>
    )
}