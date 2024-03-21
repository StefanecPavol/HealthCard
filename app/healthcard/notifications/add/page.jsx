import { addNotification, deleteNotification } from "@/app/lib/actions"
import { fetchNotifications } from "@/app/lib/data"
import styles from "@/app/ui/healthcard/notifications/add/addNotifications.module.css"
import { MdDeleteForever } from "react-icons/md";

import { BsCalendar2Date } from "react-icons/bs";

const AddNotification = async () => {

    const notifications = await fetchNotifications()
    console.log(notifications)

  return (
    <div className={styles.container}>
        <h3 className={styles.formTitle}>Pridať nový oznam</h3>

        <div className={styles.notifFormContainer}>
            <form action={addNotification} className={styles.form}>
                <input type="text" name="title" placeholder="Predmet oznamu" />

                <textarea name="description" rows="16" placeholder="Text oznamu"></textarea>
               
                <select name="category">
                    <option className={styles.option} value="General">Kategória</option>
                    <option className={styles.option} value="Dovolenka">Dovolenka</option>
                    <option className={styles.option} value="Iné">Iné</option>
                </select>

                <button>Pridať oznam</button>
            </form>
        </div>

        <div className={styles.notifContainer}>
            <h3 className={styles.notifTitle}>Existujúce oznamy</h3>
            {notifications.length < 1 && <p className={styles.noNotif}>Žiadne existujúce oznamy</p>}
            <div>
                {notifications.map(notif=>(
                    <div key={notif._id} className={styles.oneNotif}>
                        <div className={styles.notifTexts}>
                            <div className={styles.notifTextItem}>
                                <h3>Predmet oznamu</h3>
                                <p>{notif.title}</p>
                            </div>

                            <div className={styles.notifTextItem}>
                                <h3>Text oznamu</h3>
                                <p>{notif.description}</p>
                            </div>

                            <div className={styles.notifSettings}>
                                <p>{notif.createdAt.toString().slice(4,16)} <BsCalendar2Date /></p>
                                <p>{notif.category}</p>
                            </div>
                        </div>
                        <div className={styles.formButton}>
                            <form action={deleteNotification}>
                                <input type="hidden" name="id" value={notif._id.toString()} />
                                <button className={styles.deleteBtn}><MdDeleteForever size={25}/></button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AddNotification