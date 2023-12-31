import EditActor from "./actors/EditActor";
import CreateActor from "./actors/CreateActor";
import IndexActors from "./actors/IndexActors";
import CreateGenre from "./genres/CreateGenre";
import EditGenre from "./genres/EditGenre";
import IndexGenres from "./genres/IndexGenres";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";
import LandingPage from "./movies/LandingPage";
import CreateMovieTheaters from "./movietheaters/CreateMovieTheater";
import EditMovieTheater from "./movietheaters/EditMovieTheater";
import IndexMovieTheaters from "./movietheaters/IndexMovieTheaters";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";
import MovieDetails from "./genres/MovieDetails";
import Register from "./auth/Register";
import Login from "./auth/Login";
import IndexUsers from "./auth/IndexUsers";

const routes=[
    {path: "/genres", component: IndexGenres, exact:true, isAdmin: true},
    {path: "/genres/create", component: CreateGenre, isAdmin: true},
    {path: "/genres/edit/:id", component: EditGenre, isAdmin: true},
    //(//d+) means that the parater id must
    //be a number

    {path: "/actors", component: IndexActors, exact:true, isAdmin: true},
    {path: "/actors/create", component: CreateActor, exact:true, isAdmin: true},
    {path: "/actors/edit/:id", component: EditActor,exact:true, isAdmin: true},

    {path: "/movietheaters", component: IndexMovieTheaters, exact:true, isAdmin: true},
    {path: "/movietheaters/create", component: CreateMovieTheaters, isAdmin: true},
    {path: "/movietheaters/edit/:id"/*(\\d+)"*/, component: EditMovieTheater, isAdmin: true},

    {path: "/movies/filter", component: FilterMovies},
    {path: "/movies/create", component: CreateMovie, isAdmin: true},
    {path: "/movies/edit/:id(\\d+)", component: EditMovie, isAdmin: true},
    {path: "/movie/:id", component: MovieDetails},

    {path: "/register", component: Register},
    {path: "/login", component: Login},
    
    {path: "/users", component: IndexUsers,isAdmin: true},


    {path: "/", component: LandingPage, exact: true},
    {path: "*", component: RedirectToLandingPage}//this is a catch all parameter that, whatever you
    //have in the adress bar of the browser is going to be a valid path
    //for this we have here
    //we have to put it at the end of the array
    //in this case we're going to say that the onlyu





];

export default routes;