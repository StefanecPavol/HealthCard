import { signOut } from '@/app/auth'
import { MdLogout } from 'react-icons/md'
import styles from "./logout.module.css"

const Logout = () => {
  return (
    <form action={async () => {
        "use server"
        await signOut()
      }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout</button>

      </form>
  )
}

export default Logout