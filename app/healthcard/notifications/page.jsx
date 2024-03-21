import { fetchNotifications } from "@/app/lib/data"
import styles from "@/app/ui/healthcard/notifications/notifications.module.css"

import { IoMdNotifications } from "react-icons/io";

const Notifications = async () => {

  const notifications = await fetchNotifications();

  return (
    <div className={styles.container}>
        <h3 className={styles.containerHeader}>Oznamy</h3>

        <div className={styles.notificationsContainer}>
          {notifications.map(oneNotif=>(
            <div className={styles.oneNotif} key={oneNotif._id}>
                <div className={styles.notifHeader}>
                  <IoMdNotifications size={20}/>
                  <h3>{oneNotif.title}</h3>
                </div>

                <div className={styles.oneNotifDesc}>
                  <p>{oneNotif.description}</p>
                </div>

                <div className={styles.notifDate}>
                  <p>Publikované : {oneNotif.createdAt.toString().slice(4,16)}</p>
                </div>
            </div>
          ))}
        </div>
        
    </div>
  )
}

export default Notifications