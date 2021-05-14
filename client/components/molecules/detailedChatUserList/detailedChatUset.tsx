import styles from "./detailedChatUser.module.scss"

import { EmailSvg } from "../../../public/svgs"

const DetailedChatUserList = ({ email }: { email?: string }) => (
  <div className={styles.list}>
    <div className={styles.listElement}>
      <div>
        <EmailSvg />
        <p>Email</p>
      </div>
      <div>
        <p>{email}</p>
      </div>
    </div>
  </div>
)

export default DetailedChatUserList