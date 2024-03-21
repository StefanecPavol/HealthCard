import React from 'react'
import SideBar from '../ui/healthcard/sidebar/SideBar'
import NavBar from '../ui/healthcard/navbar/NavBar'
import styles from "../ui/healthcard/healthcard.module.css"
import Footer from '../ui/healthcard/footer/footer'
import Logout from '../ui/healthcard/logout/logout'
import MobileMenu from '../ui/healthcard/mobilemenu/mobileMenu'
import { auth } from '../auth'

const layout = async ({children}) => {

  const session = await auth()

  return (
    <div className={styles.container}>

        <div className={styles.mobileMenu}>
            <MobileMenu session={session}/>
        </div>

        <div className={styles.menu}>
            <SideBar />
        </div>

        <div className={styles.content}>
            <NavBar />
            {children}
            <Footer />
        </div>
  
        <div className={styles.logout}>
          <Logout />
        </div>
    </div>
  )
}

export default layout