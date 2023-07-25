import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { actorCreationDTO, actorDTO } from "./actors.model";
import ActorForm from "./ActorForm";
import { convertActorToFromData } from "../utils/FormsDataUtils";


export default function EditActor(){
    
    function transform(actor:actorDTO) :actorCreationDTO{
        return {
            name: actor.name,
            pictureURL: actor.picture,
            biography: actor.biography,
            dateOfBirth: new Date(actor.dateOfBirth)
        }
    }

    return (
        <EditEntity<actorCreationDTO, actorDTO> url={urlActors}
            indexURL="/actors" entityName="Actor"
            transformFormData={convertActorToFromData}
            transform={transform}
            >
                {(entity, edit) =>
                    <ActorForm
                        model={entity}
                        onSubmit={async values => await edit(values)} 
                    />
                }
        </EditEntity>
    )

}