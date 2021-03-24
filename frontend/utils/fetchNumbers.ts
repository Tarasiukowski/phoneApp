import axios from 'axios';

export const fetchAllNumbers = async (): Promise<string[]> => {
  const { data } = await axios.post('http://localhost:7000/generate/allNumbers');

  return data.numbers;
};

export const fetchRecommendedNumbers = async (): Promise<string[]> => {
  const { data } = await axios.get('http://localhost:7000/generate/randomNumbers');

  return data;
};
