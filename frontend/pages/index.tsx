import HomeContent from '../components/organisms/onBoardingContent/home/homeContent';
import IsLoggedTemplate from '../templates/isLoggedTemplate/isLoggedTemplate';
import MainTemplate from '../templates/mainTemplate/mainTemplate';

const HomePage = () => (
//   <IsLoggedTemplate allow="logged" redirectTo="/singup">
    <MainTemplate>
      <HomeContent />
    </MainTemplate>
//   </IsLoggedTemplate>
);

export default HomePage;
