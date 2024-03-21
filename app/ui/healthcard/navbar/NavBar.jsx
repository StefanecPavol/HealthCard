"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from "./navbar.module.css"

const NavBar = () => {

  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {pathname.split("/").pop()}
      </div>
    </div>
  )
}

export default NavBar