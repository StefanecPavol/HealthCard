import React from 'react'
import styles from "./sidebar.module.css"
import Image from "next/image"
import Link from "next/link"

import { IoIosNotifications } from "react-icons/io";
import {
  MdSupervisedUserCircle,
  MdLogout,
  MdOutlineNotificationsActive,
  MdHealthAndSafety
} from "react-icons/md";

import { FaRegAddressCard } from "react-icons/fa";

import MenuLink from './menuLink/menuLink';
import { auth, signOut } from '@/app/auth';
import AdminLink from './adminLink/adminLink';



const menuItems = [
  {
    title: "Pacient",
    list: [
      {
        title: "Profil",
        path: "/healthcard",
        icon: <FaRegAddressCard />,
      },
      {
        title: "Oznamy",
        path: "/healthcard/notifications",
        icon: <MdOutlineNotificationsActive />,
      },
    ],
  },
];

const adminLinks = [
  {
    title: "Pacienti",
    path: "/healthcard/users",
    icon: <MdSupervisedUserCircle /> ,
  },
  {
    title: "Oznamy",
    path: "/healthcard/notifications/add",
    icon: <IoIosNotifications /> ,
  },
]


const SideBar = async () => {

  const {user} = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Link href={`/healthcard`}>
        <MdHealthAndSafety size={25}/>
        </Link>
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>{user.isAdmin ? "Administrátor" : "Pacient"}</span>
        </div>
      </div>
      <ul className={styles.list}>
      {menuItems.map(cat=> (
        <li key={cat.title}>
          <span className={styles.cat}>{cat.title}</span>
          {cat.list.map(item=> (
            <MenuLink item={item} key={item.title} />
          ))}
        </li> 
      ))}
      </ul>

     {user.isAdmin && <ul className={styles.list}>
        <li>
          <span className={styles.cat}>Administrácia</span>
          <div>
            {adminLinks.map(item=> (
              <AdminLink item={item} key={item.title} />
            ))}
          </div>

        </li> 
      </ul>}

      <form action={async () => {
        "use server"
        await signOut()
      }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout</button>

      </form>
    </div>
  )
}

export default SideBar