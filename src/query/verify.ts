import axios from 'axios';

const axiosVerify = axios.create({
  baseURL: `${process.env.DEV_SERVER_URL}/twilio`,
});

interface CheckVerificationQueryInput {
  phoneNumber: string;
  verificationCode: string;
}

// export const sendVerificationQuery = async (phoneNumber: string) => {
//   const { data } = await axiosVerify.post('/sendVerification', { phoneNumber });
//   return data;
// };

// export const checkVerificationQuery = async (checkVerificationQueryInput: CheckVerificationQueryInput) => {
//   const { data } = await axiosVerify.post('/checkVerification', checkVerificationQueryInput);
//   return data;
// };
