import UserDetailed from "./userDetailed/userDetailed";
import Chat from "../../molecules/chatComponent/chat";
import styles from "./chatContent.module.scss"

const ChatContent = () => (
  <div className={styles.template}>
    <Chat />
    <UserDetailed />
  </div>
)

export default ChatContent