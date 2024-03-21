import styles from "./home.module.css"
import Link from "next/link"

const Homepage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <h1>HealthCard</h1>
        <h2>Vitajte na stránke elektronickej zdravotnej karty pacienta.</h2>
        <div className={styles.line}></div>
        <Link className={styles.loginBtn} href="/login">Login</Link>
        <p>Táto stránka slúži výlučne na testovacie účely, údaje na nej nie sú pravdivé. Nie sú použité žiadne skutočné mená, rodné čísla ani žiadne citlivé údaje.</p>
        <p className={styles.author}>Vytvoril Pavol Štefanec 2024</p>
        </div>
    </div>
  )
}

export default Homepage