const alllowRoutes = ['/settings', '/chat', '/contacts'];

export const checkOnboardingStage = (
  status: { onBoarding: boolean; redirectTo: string },
  path: string,
) => {
  let redirectTo = '';
  let loading = true;

  if (status) {
    if (status.onBoarding) {
      alllowRoutes.map((route) => {
        const allow = path.startsWith(route)

        if(allow) {
          loading = false
        } else {
          redirectTo = "/contacts"
        }
      });
    } else if (status.redirectTo === path) {
      loading = false;
    } else {
      redirectTo = status.redirectTo;
    }
  }

  return { redirectTo, loading };
};
