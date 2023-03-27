import { Input } from 'antd';
import { useAppDispatch } from '../../../../hooks';
import { searchRecipes } from '../../../../store/searchRecipe.slice';

const { Search } = Input;

export function SearchBar() {
  const dispatch = useAppDispatch();

  const searchHandle = (searchValue: string) => {
    dispatch(searchRecipes(searchValue));
    localStorage.setItem('recipeSearchValue', searchValue);
  };

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
