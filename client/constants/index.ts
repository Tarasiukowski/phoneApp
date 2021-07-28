export const paths = {
  login: {
    index: '/login',
    verify: '/login/verify',
  },
  invites: '/invites',
  singUp: '/singup',
  contacts: '/contacts',
  onBoarding: {
    code: '/onboarding/code',
    number: '/onboarding/number',
    account: '/onboarding/account',
  },
  settings: {
    profile: '/settings/profile',
    members: '/settings/members',
    manageLists: '/settings/manageLists',
    blocklist: '/settings/blocklist',
    general: '/settings/general',
    nummber: '/settings/number',
  },
};

export const loggedPaths = ['/settings', '/inbox', '/contacts', '/invites', '/group'];

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
