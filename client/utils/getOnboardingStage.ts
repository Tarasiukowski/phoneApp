import { mainPaths } from 'data';

export const getOnboardingStage = (
  status: { onBoarding: boolean; redirectTo: string },
  activePath: string,
) => {
  let redirectTo = '';
  let loading = true;

  if (status) {
    if (status.onBoarding) {
      mainPaths.map((path: string) => {
        const allow = activePath.startsWith(path);

        if (allow) {
          loading = false;
        } else {
          redirectTo = '/contacts';
        }
      });
    } else if (status.redirectTo === activePath) {
      loading = false;
    } else {
      redirectTo = status.redirectTo;
    }
  }

  return { redirectTo, loading };
};
