import Navigation from './navigation/navigation';
import Chat from '../../molecules/chatComponent/chat';
import UserDetailed from '../../molecules/userDetailed/userDetailed';

const GroupContent = () => (
  <>
    <Navigation />
    <Chat messages={[]} user={null} width="42.1vw" />
    <UserDetailed loading={true} />
  </>
);

export { GroupContent }