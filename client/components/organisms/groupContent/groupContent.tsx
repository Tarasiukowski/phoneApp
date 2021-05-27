import Navigation from './navigation/navigation';
import Chat from '../../molecules/chatComponent/chat';
import UserDetailed from '../../molecules/userDetailed/userDetailed';

export const GroupContent = () => (
  <>
    <Navigation />
    <Chat messages={[]} width="42.1vw" />
    <UserDetailed loading={true} />
  </>
);
