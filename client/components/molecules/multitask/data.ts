type Stage = {
  title: string;
  description: string;
  inputName: 'email' | 'code' | 'text';
  inputPlaceholder: string;
  unlimited?: boolean;
  textButton?: string;
};

type OptionComponent = {
  name: 'ChangeEmail' | 'InviteFriend' | 'CreateGroup';
  stages: Stage[];
};

export const optionsComponent: OptionComponent[] = [
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
        textButton: 'Ok',
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
        textButton: 'Send',
      },
    ],
  },
  {
    name: 'CreateGroup',
    stages: [
      {
        title: 'Group name',
        description: 'you will be found this group by name',
        inputName: 'text',
        inputPlaceholder: 'Enter an group name',
      },
      {
        title: 'Pass a member',
        description: 'to join the group',
        inputName: 'email',
        inputPlaceholder: 'Enter an friend email',
        textButton: 'Add',
        unlimited: true,
      },
    ],
  },
];
