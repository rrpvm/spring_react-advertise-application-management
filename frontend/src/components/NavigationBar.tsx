import { Link } from "react-router-dom"

export const NavigationBar: React.FC = () => {
    return <nav className="nav">
        <div className="nav-wrapper">
            <ul className="nav-list nav nav-tabs card-header-tabs">            
                <li className="nav-item"><Link to="/banners" className="nav-link">Banners</Link></li>
                <li className="nav-item"><Link to="/categories" className="nav-link">Banners</Link></li>
            </ul>
        </div>
    </nav>
}