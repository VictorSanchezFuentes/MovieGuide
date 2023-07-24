import GenreForm from "./GenreForm";
import EditEntity from "../utils/EditEntity";
import { genreCreationDTO, genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";



export default function EditGenre(){
    
        
    


    return(
        <>
            <EditEntity<genreCreationDTO, genreDTO> 
                url={urlGenres} entityName="Genres"
                indexURL="/genres"
            >
                {(entity, edit) => 
                    <GenreForm model={entity}
                    onSubmit={async value => {
                        await edit(value);
                    }}
                    />
                }
            </EditEntity>


        </>
    )

}