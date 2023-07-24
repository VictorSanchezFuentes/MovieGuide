import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actors.model";
import { ReactElement, useState } from "react";

export default  function TypeAheadActors(props: typeAheadActorsProps){
    
    const actors: actorMovieDTO[] = [{
        id: 1, name: "Felipe", character: "", picture:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg"

    },
    {
        id: 2, name: "Fernando", character: "", picture:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Chris_Pratt_2018.jpg/330px-Chris_Pratt_2018.jpg"

    },
    {
        id: 3, name: "Jessica", character: "", picture:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Amy_Adams_UK_Nocturnal_Animals_Premiere_%28cropped%29.jpg/330px-Amy_Adams_UK_Nocturnal_Animals_Premiere_%28cropped%29.jpg"

    },
    {
        id: 4, name: "Alejandro", character: "", picture:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Joaquin_Phoenix_in_2018.jpg/330px-Joaquin_Phoenix_in_2018.jpg"

    },]

    const selected: actorMovieDTO[] = [];

    const [draggedElement, setDraggedElement] = useState<actorMovieDTO | undefined> (undefined);
    //actorMovieDTO or undefined and undefined is passed by default
    
    function handleDragStart(actor: actorMovieDTO){
            setDraggedElement(actor);
    }

    function handleDragOver(actor: actorMovieDTO){
        if(!draggedElement){
            return;
        }
        if (actor.id !== draggedElement.id){
            const draggedElementIndex = props.actors.findIndex(x => x.id ===
                draggedElement.id);
            const actorToBeReplacedIndex = props.actors.findIndex(x => 
                x.id === actor.id);

            const actors = [...props.actors];
            actors[actorToBeReplacedIndex] = draggedElement;
            actors[draggedElementIndex] = actor;
            props.onAdd(actors);//in this case
            //is more of an onChange, but still
        }
    }
    
    
    
    return(
        <div className="mb-3">
            {/* //for margin */}
            <label>{props.displayName}</label>
            <Typeahead
                id="typeahead"
                onChange={actors => {
                    // @ts-ignore
                    if(props.actors.findIndex(x => x.id === actors[0].id) === -1){
                        // @ts-ignore
                        props.onAdd([...props.actors,actors[0]]);

                    }
                    

                    console.log(actors);
                }}
                options={actors}
                // @ts-ignore
                labelKey={actor => actor.name}
                filterBy={["name"]}
                placeholder="write the name of the actor"
                minLength={1}
                flip={true}
                selected={selected}
                renderMenuItemChildren={actor => (
                    <>
                        {/* @ts-ignore */}
                        <img alt="actor" src={actor.picture}
                            style={{
                                height: "64px",
                                marginRight: "10px",
                                width: "64px"
                            }}
                        />
                        {/* @ts-ignore */}
                        <span>{actor.name}</span>

                    </>
                )}
            />

            <ul className="list-group">
                {props.actors.map(actor => <li 
                key={actor.id}
                draggable={true}
                onDragStart={() => handleDragStart(actor)}
                onDragOver={() => handleDragOver(actor)}
                className="list-group-item list-group-item-action">
                        {props.listUI(actor)}
                        <span className="badge badge-primary badge-pill pointer text-dark"
                        style={{marginLeft: "0.5rem"}}
                        onClick={() => props.onRemove(actor)}>
                            X
                            </span>
                </li>)}
            </ul>
        
        </div>
    )
}


interface typeAheadActorsProps {
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]): void;
    listUI(actor: actorMovieDTO): ReactElement;
    onRemove(actor: actorMovieDTO): void;
}

