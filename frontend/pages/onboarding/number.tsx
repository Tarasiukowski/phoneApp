import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import OnboardingTemplate from '../../templates/onboardingTemplate/onboardingTemplate';
import OnboardingNumberContent from '../../components/organisms/onBoardingContent/number/number';
import { loginByToken } from '../../utils/loginByToken';
import { login } from '../../reducers/userReducer';
import { propsOnboardingNumberPage } from '../../interfaces'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await loginByToken(req, res);

  return {
    props: {
      user,
    },
  };
};

const OnboardingNumberPage = ({ user }: propsOnboardingNumberPage) => {
  const disptach = useDispatch();

  disptach(login(user));

  return (
    <OnboardingTemplate>
      <OnboardingNumberContent />
    </OnboardingTemplate>
  );
};

export default OnboardingNumberPage;
