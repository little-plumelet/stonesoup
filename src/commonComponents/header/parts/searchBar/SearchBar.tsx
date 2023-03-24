import { Input, message } from 'antd';
import axios from 'axios';

const { Search } = Input;
const API_KEY = import.meta.env.VITE_SPINACULAR_API_KEY;

async function searchHandle(value: string) {
  axios
    .get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        query: value,
        addRecipeInformation: true,
        apiKey: API_KEY,
        number: 8,
      },
    })
    .then((response) => {
      console.log('data = ', response?.data?.results);
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      } else {
        message.error('An unexpected error occurred');
      }
    });
}

export function SearchBar() {
  return (
    <Search
      placeholder="input search text"
      enterButton
      allowClear
      onSearch={searchHandle}
      style={{ width: 200 }}
    />
  );
}
