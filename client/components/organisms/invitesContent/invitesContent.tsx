import UsersList from '../../molecules/usersList/usersList';

const InvitesContent = () => <UsersList {...optionsUsersList} />;

const optionsUsersList = {
  headerTitle: 'Invites',
};

export default InvitesContent;
