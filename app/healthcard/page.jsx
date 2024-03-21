import { auth } from "../auth";
import { fetchMessages, fetchUserByUsername } from "../lib/data";
import styles from "../ui/healthcard/healthcard.module.css";

// Ikony
import { IoManSharp } from "react-icons/io5";
import { IoWomanSharp } from "react-icons/io5";

import { FaHome } from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";
import { FaSquarePhone } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Diagnosis from "../ui/healthcard/diagnosis/Diagnosis";

const HealthCardPage = async () => {

  const {user} = await auth();
  const usernameToFunction = user.username;
  const userInfo = await fetchUserByUsername(usernameToFunction);

  const messages = await fetchMessages(userInfo._id)
  
  const {nameAndSurname, gender, diagnosis, email, phone, address, identificationNumber} = userInfo

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.userContainer}>

      <div className={styles.userMainInfo}>
        <div className={styles.userIcon}>
          {gender === "Muž" ? <IoManSharp size={50}/> : <IoWomanSharp size={50}/>}
        </div>
        <h2>{nameAndSurname}</h2>
        <p>{gender}</p>
      </div>


       <div className={styles.userInfoRow}>
          <div className={styles.rowLeft}>
            <FaHome size={25} className={styles.userRowIcon}/>
            <h3 className={styles.rowTitle}>Adresa</h3>
          </div>
          <p className={styles.rowDesc}>{address}</p>
       </div>
       <div className={styles.userInfoRow}>
          <div className={styles.rowLeft}>
            <HiMiniIdentification size={25} className={styles.userRowIcon} />
            <h3 className={styles.rowTitle}>Rodné číslo</h3>
          </div>
          <p className={styles.rowDesc}>{identificationNumber}</p>
       </div>
       <div className={styles.userInfoRow}>
          <div className={styles.rowLeft}>
            <FaSquarePhone size={25} className={styles.userRowIcon} />
            <h3 className={styles.rowTitle}>Telefónne Číslo</h3>
          </div>
          <p className={styles.rowDesc}>{phone}</p>
       </div>
       <div className={styles.userInfoRow}>
          <div className={styles.rowLeft}>
            <MdOutlineAlternateEmail size={25} className={styles.userRowIcon} />
            <h3 className={styles.rowTitle}>E-mail</h3>
          </div>
          <p className={styles.rowDesc}>{email}</p>
       </div>

      <div className={styles.userDiagnosis}>
          <h3 className={styles.diagnosisTitle}>Vaše diagnózy</h3>
          <p className={styles.diagnosisTitleDesc}>Kliknutím na šípku rozbalíte popis diagnózy</p>
          <Diagnosis diagnosis={diagnosis}/>
      </div>

      <div className={styles.userMessagesContainer}>
          <h3 className={styles.userMessagesTitle}>Vaše správy</h3>
          {messages.map(oneMessage => (
            <div key={oneMessage._id} className={styles.messageContainer}>
                <div className={styles.messageItem}>
                  <div>
                    <h3 className={styles.userMessageItemTitle}>Predmet</h3>
                    <p>{oneMessage.subject}</p>
                  </div>
                  <div>
                    <p className={styles.messageCreatedAt}>{oneMessage.createdAt.toString().slice(4,16)}</p>
                  </div>
                </div>
                <div className={styles.messageItem}>
                  <div>
                  <h3 className={styles.userMessageItemTitle}>Text správy</h3>
                  <p>{oneMessage.description}</p>
                  </div>
                </div>
            </div>
          ))}
      </div>

      </div>
    
    </div>
  );
};

export default HealthCardPage;