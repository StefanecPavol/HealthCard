"use client"
import { authenticate } from "@/app/lib/actions"
import styles from "./loginForm.module.css"
import {useFormState} from "react-dom"
import { BsCardChecklist } from "react-icons/bs";

const LoginForm = () => {


  const [state, formAction] = useFormState(authenticate, undefined)

  return (
    <form action={formAction}
    className={styles.form}>
      <div className={styles.formHeader}>
        <BsCardChecklist className={styles.icon} size={50}/>
        <h1>HealthCard | Login</h1>
      </div>
      <input type="text" placeholder="Prihlasovacie meno" name="username" />
      <input type="password" placeholder="Heslo" name="password" />
      <button>Login</button>
      {state && state}
      </form>
  )
}

export default LoginForm