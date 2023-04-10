import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants';

export interface IGetRandomRecipesPros {
  tags: string[];
  number: number;
}

export async function getRandomRecipesAsync({
  tags,
  number,
}: IGetRandomRecipesPros) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        apiKey: API_KEY,
        number,
        tags: tags.join(','),
      },
    });
    return response?.data?.recipes;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(error.message);
    } else {
      throw Error('Unknown error occurred');
    }
  }
}
