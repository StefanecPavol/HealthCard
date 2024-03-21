"use client"
import React from 'react'
import Link from "next/link"
import styles from "./mobileMenu.module.css"
import {useState} from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";


const MobileMenu = ({session}) => {

    const [menu, setMenu] = useState(false)
    
  return (
    <div className={styles.container}>
        <button className={styles.button} onClick={() => setMenu(!menu)}>
            {menu ? <AiOutlineClose size={25} /> : <GiHamburgerMenu size={25}  />}
        </button>

        {menu && (
            <div className={styles.linksContainer}>
                 <div className={styles.mobileUserInfo}>
                {session.user.nameAndSurname}
                </div>
                <Link onClick={() => setMenu(false)} className={styles.link} href="/healthcard">Profil</Link>
                <Link onClick={() => setMenu(false)} className={styles.link} href="/healthcard/notifications">Notifikácie</Link>
                {session.user.isAdmin && 
                <div className={styles.adminLinks}>
                    <p>Administrácia</p>
                    <Link onClick={() => setMenu(false)}  className={styles.link} href="/healthcard/users">Pacienti</Link>
                    <Link onClick={() => setMenu(false)}  className={styles.link} href="/healthcard/notifications/add">Oznamy</Link>
                </div>
                }
            </div>
        )}
    </div>
  )
}

export default MobileMenu