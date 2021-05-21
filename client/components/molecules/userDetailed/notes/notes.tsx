import { TextArea } from "../../../atoms/textArea/textArea"

import styles from './notes.module.scss'

const Notes = () => {

  return (
    <div className={styles.template}>
      <p className={styles.heading}>Notes: 1</p>
      <div className={styles.note}>
      
      </div>
      <TextArea placeholder="Write a note..." />
    </div>
  )
}

export default Notes