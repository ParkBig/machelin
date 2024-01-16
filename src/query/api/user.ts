import { deleteToken, takeToken } from 'util/tokenDB';
import { createAxiosInstance } from './api';

export const axiosUsers = createAxiosInstance('users');

interface LoginInput {
  loginId: string;
  password: string;
}

interface SignUpInput extends LoginInput {
  nickname: string;
}

interface ModifyUserNicknameInput {
  changeNickname: string;
}

interface ModifyUserActivityZoneInput {
  changeActivityZone: string;
}

interface ModifyUserPreferFoodInput {
  type: 'add' | 'delete';
  changePreferFood: string;
}

interface ModifyUserPreferRestaurant {
  changePreferRestaurant: string;
}

interface ToggleFriendStateInput {
  exploreUserId: number;
}

interface CheckSignUpVerificationInput {
  phoneNumber: string;
  verificationCode: string;
}

// get~
export const myInfoQuery = async () => {
  const token = await takeToken();

  if (!token) return { ok: true, authUser: null };

  const { data } = await axiosUsers.get('/me');
  return data;
};

export const findUsersQuery = async (nickname: string) => {
  const { data } = await axiosUsers.get('/findUsers', {
    params: {
      nickname,
    },
  });
  return data;
};

export const exploreUserQuery = async (userId: number) => {
  const { data } = await axiosUsers.get('/exploreUser', {
    params: {
      userId,
    },
  });
  return data;
};

export const usersFollowsQuery = async (userId?: number) => {
  if (!userId) {
    return { ok: true, follows: null };
  }

  const { data } = await axiosUsers.get('/usersFollows', {
    params: {
      userId,
    },
  });
  return data;
};

export const usersFollowersQuery = async (userId?: number) => {
  if (!userId) {
    return { ok: true, follows: null };
  }

  const { data } = await axiosUsers.get('/usersFollowers', {
    params: {
      userId,
    },
  });
  return data;
};

// post~
export const signUpQuery = async (signupInput: SignUpInput) => {
  const token = await takeToken();

  if (token) {
    await deleteToken();
  }

  const { data } = await axiosUsers.post('/signUp', signupInput);
  return data;
};

export const loginQuery = async (loginInput: LoginInput) => {
  const token = await takeToken();

  if (token) {
    await deleteToken();
  }

  const { data } = await axiosUsers.post('/login', loginInput);
  return data;
};

export const sendSignUpVerificationQuery = async (phoneNumber: string) => {
  const { data } = await axiosUsers.post('/sendSignUpVerification', { phoneNumber });
  return data;
};

export const checkSignUpVerificationQuery = async (checkSignUpVerificationInput: CheckSignUpVerificationInput) => {
  const { data } = await axiosUsers.post('/checkSignUpVerification', checkSignUpVerificationInput);
  return data;
};

export const sendFindMyIdVerificationQuery = async (phoneNumber: string) => {
  const { data } = await axiosUsers.post('/sendFindMyIdVerification', { phoneNumber });
  return data;
};

export const checkFindMyIdVerificationQuery = async (checkFindMyIdVerificationInput: CheckSignUpVerificationInput) => {
  const { data } = await axiosUsers.post('/checkFindMyIdVerification', checkFindMyIdVerificationInput);
  return data;
};

export const modifyUserImageQuery = async (modifyUserImageInput: FormData) => {
  const { data } = await axiosUsers.post('/modifyUserImage', modifyUserImageInput, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const modifyUserNicknameQuery = async (modifyUserNicknameInput: ModifyUserNicknameInput) => {
  const { data } = await axiosUsers.post('/modifyUserNickname', modifyUserNicknameInput);
  return data;
};

export const modifyUserActivityZoneQuery = async (modifyUserActivityZoneInput: ModifyUserActivityZoneInput) => {
  const { data } = await axiosUsers.post('/modifyUserActivityZone', modifyUserActivityZoneInput);
  return data;
};

export const modifyUserPreferFoodQuery = async (modifyUserPreferFoodInput: ModifyUserPreferFoodInput) => {
  const { data } = await axiosUsers.post('/modifyUserPreferFood', modifyUserPreferFoodInput);
  return data;
};

export const modifyUserPreferRestaurantQuery = async (modifyUserPreferRestaurant: ModifyUserPreferRestaurant) => {
  const { data } = await axiosUsers.post('/modifyUserPreferRestaurant', modifyUserPreferRestaurant);
  return data;
};

export const toggleFriendStateQuery = async (toggleFriendStateInput: ToggleFriendStateInput) => {
  const { data } = await axiosUsers.post('/toggleFriendState', toggleFriendStateInput);
  return data;
};

// delete
export const withdrawalQuery = async () => {
  const { data } = await axiosUsers.delete('/withdrawal');
  return data;
};
