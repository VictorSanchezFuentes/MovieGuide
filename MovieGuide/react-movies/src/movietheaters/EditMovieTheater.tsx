import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater(){
    return(
        <>
            <h3>Edit Movie Theater</h3> 
            <MovieTheaterForm 
                model={{name:"Sambil", latitude: 35.894852648935704,longitude: -5.295976638826688}}
                onSubmit={values => console.log(values)}
            
            
            
            
            />      
        </>
    )
}