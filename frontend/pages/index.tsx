import HomeContent from '../components/organisms/onBoardingContent/home/homeContent';
import IsLoggedTemplate from '../templates/isLoggedTemplate/isLoggedTemplate';

const HomePage = () => (
  <IsLoggedTemplate allow="logged" redirectTo="/singup">
    <HomeContent />
  </IsLoggedTemplate>
);

export default HomePage;
