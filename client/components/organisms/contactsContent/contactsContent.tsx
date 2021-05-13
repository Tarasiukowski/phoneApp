import UsersList from '../../molecules/usersList/usersList'

const ContactsContent = () => <UsersList {...optionsUsersList} />

const optionsUsersList = {
  headerTitle: "Friends"
}

export default ContactsContent;
