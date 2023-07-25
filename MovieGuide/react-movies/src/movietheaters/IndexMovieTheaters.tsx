import IndexEntity from "../utils/IndexEntity";
import { urlMovieTheaters } from "../endpoints";
import { movieTheaterDTO } from "./movieTheater.model";

export default function IndexMovieTheaters(){
    return(
            <IndexEntity<movieTheaterDTO> url={urlMovieTheaters} title="Movie Theaters"
            createURL="/movietheaters/create" entityName="Movie Theater"
            >
                    {(entities, buttons) => <>
                        <thead>
                            <tr></tr>
                            <tr>Name</tr>
                        </thead>
                        <tbody>
                            {/* @ts-ignore */}
                            {entities?.map(entity => <tr key={entity.id}>
                                <td>
                                    {/* @ts-ignore */}
                                    {buttons(`/movietheaters/edit/${entity.id}`, entity.id)}
                                </td>
                                <td>
                                    {entity.name}
                                </td>
                            </tr>)}
                        </tbody>
                    </>}
            </IndexEntity>
    )
}