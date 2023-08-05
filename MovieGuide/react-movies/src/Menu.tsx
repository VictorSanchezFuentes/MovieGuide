import { Link, NavLink } from "react-router-dom";
import Authorized from "./auth/Authorized";
import Button from "./utils/Button";
import { logout } from "./auth/HandleJWT";
import { useContext } from "react";
import AuthenticationContext from "./auth/AuthenticationContext";

export default function Menu(){

    
    const {update, claims} = useContext(AuthenticationContext);

    function getUserEmail(): string {
        return claims.filter(x => x.name==="email")[0]?.value;
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* <a className="navbar-brand" href="/">React Movies</a> */}
                <NavLink className="navbar-brand" to="/">React Movies</NavLink>
                {/* this  way  it doesn't refresh whenever we change the URL */}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-navlink" to="/movies/filter">Filter Movies</NavLink>
                            </li>

                            
                        </ul>
                        <Authorized 
                                role="admin"
                                authorized={<>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-navlink" to="/genres">Genres</NavLink>
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
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-navlink" to="/users">Users</NavLink>
                                    </li>
                                </ul>
                                </>}
                            />

                        <div className="d-flex">
                            <Authorized 
                                // role="admin"
                                authorized={<>
                                    <span className="nav-link">Hello, {getUserEmail()}</span>
                                    <Button className="nav-link btn btn-link"
                                        onClick={() => {
                                            logout();
                                            update([]);
                                        }}
                                    >Log out</Button>
                                </>}
                                notAuthorized={<>
                                    <Link to="/register" className="nav-link btn btn-link">Register</Link>
                                    <Link to="/login" className="nav-link btn btn-link">Login</Link>
                                </>}
                            
                            />
                        </div>

                        


                    </div>

            </div>

        </nav>
    )
}