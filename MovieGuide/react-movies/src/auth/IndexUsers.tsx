import { urlAccounts } from "../endpoints";
import Button from "../utils/Button";
import CustomConfirm from "../utils/CustomConfirm";
import IndexEntity from "../utils/IndexEntity";
import { userDTO } from "./auth.models";

export default function IndexUsers(){

    async function makeAdmin(id: string){

    }

    async function removeAdmin(id: string){

    }






    return(
        <IndexEntity<userDTO>
            
            title="Users" url={`${urlAccounts}/listUsers`}    
        >
            {users => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => <tr key={user.id}>
                        <td>
                            <Button 
                                onClick={() => CustomConfirm(() => makeAdmin(user.id),
                                `Do you wish to make ${user.email} and admin?`, "Do it") }
                            >Make Admin</Button>
                            <Button 
                                className="btn btn-danger ms-2"
                                onClick={() => CustomConfirm(() => removeAdmin(user.id),
                                `Do you wish to remove ${user.email} as an admin?`, "Do it") }
                            >Remove Admin</Button>
                        </td>
                        <td>
                            {user.email}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}