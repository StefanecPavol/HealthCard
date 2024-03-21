"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./pagination.module.css"

const Pagination = ({count}) => {
  const searchParams = useSearchParams()
  const {replace} = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);

  const ITEM_PER_PAGE = 2

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  const handleChangePage =  (type) => {
    type === "prev" ? params.set("page", parseInt(page) - 1) : params.set("page", parseInt(page) + 1);
    replace (`${pathname}?${params}`)
  }

  return (
    <div className={styles.container}>
        <button 
        disabled={!hasPrev} 
        className={styles.button}
        onClick={() => handleChangePage("prev")}>
          Späť
          </button>
        <button 
        disabled={!hasNext} 
        className={styles.button}
        onClick={() => handleChangePage("next")}>
          Ďalej
          </button>
    </div>
  )
}

export default Pagination