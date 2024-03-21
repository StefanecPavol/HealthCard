import { addUser } from '@/app/lib/actions'
import styles from '@/app/ui/healthcard/users/addUser/addUser.module.css'

const AddUserPage = () => {
  return (
    <div className={styles.container}>
        <form action={addUser} className={styles.form}>
            <input 
            type="text"
            placeholder="Prihlasovacie meno"
            name="username"
            required />
            <input 
            type="text" 
            name="nameAndSurname" 
            placeholder="Meno a priezvisko" />
            <input 
            type="email"
            placeholder="Email"
            name="email"
            required />
            <input 
            type="password"
            placeholder="Heslo"
            name="password"
            required />
             <input 
            type="text"
            placeholder="Rodné číslo"
            name="identificationNumber"
             />
            <input 
            type="phone"
            placeholder="Telefónne číslo"
            name="phone"
             />
            <textarea 
            name="diagnosis" 
            id="diagnosis" 
            rows="16" 
            placeholder="Diagnózy"></textarea>

            <select name="isAdmin" id="isAdmin">
                <option value={false}>Oprávnenie administrátora</option>
                <option value={true}>Áno</option>
                <option value={false}>Nie</option>
            </select>


            <input type="text" placeholder="Adresa" name="address" />

            <select name="gender">
              <option value="Nedefinované">Pohlavie</option>
              <option value="Muž">Muž</option>
              <option value="Žena">Žena</option>
            </select>

            <button type="submit">Pridať pacienta</button>
        </form>
    </div>
  )
}

export default AddUserPage