import { NavLink } from "react-router-dom";

export default function Menu(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* <a className="navbar-brand" href="/">React Movies</a> */}
                <NavLink className="navbar-brand" to="/">React Movies</NavLink>
                {/* this  way  it doesn't refresh whenever we change the URL */}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-navlink" to="/genres">Genres</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-navlink" to="/movies/filter">Filter Movies</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-navlink" to="/actors">Actors</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-navlink" to="/movietheaters">Movie Theaters</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-navlink" to="/movies/create">Create a Movie</NavLink>
                            </li>
                        </ul>


                    </div>

            </div>

        </nav>
    )
}