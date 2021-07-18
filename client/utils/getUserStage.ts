import { loggedPaths } from 'data';
import { paths } from '../constants';

export const getUserStage = (
  status: { onBoarding: { value: boolean; stage: string } },
  activePath: string,
) => {
  const defaultStage = {
    redirectTo: paths.singUp,
    notAllowed: true,
  };

  if (status) {
    const { onBoarding } = status;
    const isOnBoarding = onBoarding.value;

    if (isOnBoarding) {
      const loggedPath = loggedPaths.find((path) => activePath.startsWith(path));

      if (loggedPath) {
        defaultStage.notAllowed = false;
      } else {
        defaultStage.redirectTo = loggedPath ? loggedPath : paths.contacts;
      }
    } else {
      const { stage } = onBoarding;

      if (activePath === stage) {
        defaultStage.notAllowed = false;
      } else {
        defaultStage.redirectTo = stage;
      }
    }
  }

  return defaultStage;
};
