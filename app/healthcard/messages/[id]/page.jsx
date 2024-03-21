import { addMessage, deleteMessage } from '@/app/lib/actions';
import { fetchMessages, fetchUser } from '@/app/lib/data';
import styles from "@/app/ui/messages/messages.module.css"
import Link from "next/link"
import { MdDeleteForever } from "react-icons/md";

const page = async ({params}) => {

    const {id} = params;
    const user = await fetchUser(id)

    const {nameAndSurname, gender, diagnosis, email, phone, address} = user;

    const messages = await fetchMessages(id)
    

  return (
    <div className={styles.container}>
        <div className={styles.userContainer}>

            <div className={styles.userContainerItem}>
                <h3>Meno</h3>
                <p>{nameAndSurname}</p>
            </div>

            <div className={styles.userContainerItem}>
                <h3>Adresa</h3>
                <p>{address}</p>
            </div>

            <div className={styles.userContainerItem}>
                <h3>Pohlavie</h3>
                <p>{gender}</p>
            </div>

            <div className={styles.userContainerItem}>
                <h3>Email</h3>
                <p>{email}</p>
            </div>

            <div className={styles.userContainerItem}>
                <h3>Telefón</h3>
                <p>{phone}</p>
            </div>

            <div className={styles.userContainerItem}>
                <h3>Diagnózy</h3>
                <p>{diagnosis}</p>
            </div>
        </div>

        <div className={styles.profileBtnContainer}>
            <Link href={`/healthcard/users/${id}`} className={styles.profileBtn}>
                Upraviť Profil
            </Link>
        </div>

        <div className={styles.formContainer}>
            <h2 className={styles.formHeader}>Formulár na odoslanie správy pacientovi</h2>
            <form action={addMessage} className={styles.form}>
                <input type="hidden" name="userId" value={id} />
                <input 
                type="text"
                placeholder="Predmet Správy"
                name="subject"
                />

                <textarea 
                type="text"
                placeholder="Text správy"
                name="description">
                </textarea>

                <button>Odoslať</button>

            </form>
        </div>

        <div className={styles.messagesContainer}>
        {messages.map(oneMessage => (
            <div className={styles.oneMessage} key={oneMessage._id}>
                <div className={styles.oneMessageText}>
                    <h3>Predmet správy</h3>
                    <p>{oneMessage.subject}</p>
                    <h3>Text správy</h3>
                    <p>{oneMessage.description}</p>
                </div>
               
                <form action={deleteMessage} className={styles.oneMessageForm}>
                    <input type="hidden" name="id" value={oneMessage._id.toString()} />
                    <input type="hidden" name="userId" value={id} />
                    <button className={styles.oneMessageBtn}><MdDeleteForever size={25}/></button>
                </form>
            </div>
        ))}
        </div>
    </div>
  )
}

export default page