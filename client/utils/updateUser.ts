import axios from 'axios';

export const updateUser = (...args: any[]) => {
  let passData = {};

  args[0].map((arg: any) => {
    passData = { ...passData, ...arg };
  });

  console.log(passData)

  axios.post('http://localhost:7000/user/update', passData);
};
