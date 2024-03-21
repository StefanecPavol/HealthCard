import { updateUser } from "@/app/lib/actions";
import { fetchUser } from "@/app/lib/data";
import styles from "@/app/ui/healthcard/users/singleUser/singleUser.module.css"

const SingleUserPage = async ({params}) => {

    const {id} = params;
    const user = await fetchUser(id);

  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <form action={updateUser} className={styles.form}>
                <input type="hidden" name="id" value={user.id} />
                <label>Prihlasovacie meno</label>
                <input 
                type="text"
                name="username"
                placeholder={user.username} />
                <label>Meno a priezvisko</label>
                <input 
                type="text" 
                name="nameAndSurname" 
                placeholder={user.nameAndSurname}/>
                 <label>Rodné číslo</label>
                <input 
                type="text" 
                name="identificationNumber" 
                placeholder={user.identificationNumber}/>
                <label>Email</label>
                <input 
                type="email"
                name="email"
                placeholder={user.email} />
                <label>Password</label>
                <input 
                type="password"
                name="password"
                />
                <label>Diagnózy</label>
                <textarea 
                type="diagnosis"
                name="diagnosis"
                placeholder={user.diagnosis}></textarea>
                <label>Telefónne číslo</label>
                <input 
                type="text"
                name="phone"
                placeholder={user.phone} />
                <label>Adresa</label>
                <input 
                type="text" 
                name="Address" 
                placeholder={user.address} />

                <label>Oprávnenie administrátora</label>
                <select name="isAdmin" id="isAdmin">
                    <option value={true} selected={user.isAdmin}>Áno</option>
                    <option value={false} selected={!user.isAdmin}>Nie</option>
                </select>
                
                <button>Update</button>
            </form>
        </div>
    </div>
  )
}

export default SingleUserPage