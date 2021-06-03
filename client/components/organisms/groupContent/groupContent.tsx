import { Chat, UserDetailed } from '../../molecules';
import Navigation from './navigation/navigation';

const GroupContent = () => (
  <>
    <Navigation />
    <Chat messages={[]} user={null} width="42.1vw" />
    <UserDetailed loading={true} />
  </>
);

export { GroupContent };
