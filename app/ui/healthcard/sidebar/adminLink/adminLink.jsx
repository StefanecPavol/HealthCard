"use client"
import React from 'react'
import Link from "next/link"
import styles from "./adminLink.module.css"
import { usePathname } from 'next/navigation'

const AdminLink = ({item}) => {

  const pathname = usePathname()

  return (
    <Link 
    href={item.path}
    className={`${styles.container} ${pathname === item.path && styles.active}`}>
        {item.icon}
        {item.title}
    </Link>
  )
}

export default AdminLink