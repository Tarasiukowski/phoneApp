import styles from "./detailedChatUser.module.scss"

import { EmailSvg } from "../../../public/svgs"

const DetailedChatUserList = () => (
  <div className={styles.list}>
    <div className={styles.listElement}>
      <div>
        <EmailSvg />
        <p>Email</p>
      </div>
      <div>
        <p>michal.tarasiuk03@gmail.com</p>
      </div>
    </div>
  </div>
)

export default DetailedChatUserList