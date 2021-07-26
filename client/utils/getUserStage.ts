import { paths, loggedPaths } from '../constants';

export const getUserStage = (
  status: { onBoarding: { value: boolean; stage: string }; verify: { stage: string } | null },
  activePath: string,
) => {
  const defaultStage = {
    redirectTo: paths.singUp,
    notAllowed: true,
  };

  if (status) {
    const { onBoarding, verify } = status;
    const endOnBoarding = onBoarding.value;

    if (verify) {
      const { stage } = verify;

      if (activePath === stage) {
        defaultStage.notAllowed = false;
      } else {
        defaultStage.redirectTo = stage;
      }
    } else if (endOnBoarding) {
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
