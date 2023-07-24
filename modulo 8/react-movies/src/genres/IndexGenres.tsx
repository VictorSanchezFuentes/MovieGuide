import { genreDTO } from "./genres.model";
import {urlGenres} from "../endpoints";
import IndexEntity from "../utils/IndexEntity";


export default function IndexGenres(){
        return(
        <>
            <IndexEntity<genreDTO> 
            url={urlGenres} createURL="/genres/create"
            title="Genres" entityName="Genre"
            >
                {(genres,buttons) => 
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                            </tr>

                        </thead>
                        <tbody>
                            {/* @ts-ignore */}
                            {genres?.map(genre=>
                                //@ts-ignore
                                <tr key={genre.id}>
                                    <td>
                                        {/* @ts-ignore */}
                                        {buttons(`/genres/edit/${genre.id}`, genre.id)}
                                    </td>
                                    <td>
                                        {/* @ts-ignore */}
                                        {genre.name}
                                    </td>
                                </tr>)}
                        </tbody>
                    </>
                
                
                }
            
            </IndexEntity>
            
        </>
    )
}