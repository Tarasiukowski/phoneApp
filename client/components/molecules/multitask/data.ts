export const optionsComponent = [
  {
    name: 'ChangeEmail',
    stages: [
      {
        title: 'Pass new e-mail',
        description: 'to which the code will be sent',
        inputName: 'email',
        inputPlaceholder: 'Enter an email adress',
      },
      {
        title: 'Pass verify code',
        description: 'to which send to your e-mail',
        inputName: 'code',
        inputPlaceholder: 'Enter an verify code',
      },
    ],
  },
  {
    name: 'InviteFriend',
    stages: [
      {
        title: 'Pass friend e-mail',
        description: 'to send invite',
        inputName: 'email',
        inputPlaceholder: 'Enter an email adress',
      },
    ],
  },
];
