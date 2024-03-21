import Search from "@/app/ui/healthcard/searchComponent/search"
import styles from "@/app/ui/healthcard/users/users.module.css"
import Link from "next/link"
import Pagination from "@/app/ui/healthcard/pagination/pagination"
import { fetchUsers } from "@/app/lib/data"
import { deleteUser } from "@/app/lib/actions"

import { IoManSharp } from "react-icons/io5";
import { IoWomanSharp } from "react-icons/io5";

const UsersPage = async ({searchParams}) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {count, users} = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Zadajte meno pacienta" />
        <Link href="/healthcard/users/add">
        <button className={styles.addButton}>Pridať pacienta</button>
        </Link>
      </div>

      {users.map(oneUser=> (
        <div key={oneUser.id} className={styles.usersContainer}>

            <div>
              {oneUser.gender === "Muž" ? <IoManSharp size={30} className={styles.iconMan}/> : <IoWomanSharp size={30} className={styles.iconWoman}/> }
            </div>

            <div>
              <p>Meno a priezvisko</p>
              <h3>{oneUser.nameAndSurname}</h3>
            </div>
            <div>
              <p>Rodné číslo</p>
              <h3>{oneUser.identificationNumber}</h3>
            </div>
            <div>
              <p>E-mail</p>
              <h3>{oneUser.email}</h3>
            </div>
            <div>
              <p>Pohlavie</p>
              <h3>{oneUser.gender}</h3>
            </div>

            <div className={styles.buttons}>
              <Link href={`/healthcard/messages/${oneUser.id}`}>
                <button className={`${styles.button}`}>Správa</button>
              </Link>
              <Link href={`/healthcard/users/${oneUser.id}`}>
                <button className={`${styles.button}`}>Detail</button>
              </Link>
              <form action={deleteUser}>
                <input type="hidden" name="id" value={oneUser.id} />
                <button className={`${styles.button} ${styles.delete}`}>Vymazať</button>
              </form>
              </div>
        </div>
      ))}
      <Pagination count={count}/>
    </div>
  )
}

export default UsersPage