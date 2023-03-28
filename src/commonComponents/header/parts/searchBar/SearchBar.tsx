import { Input } from 'antd';
import { useAppDispatch } from '../../../../hooks';
import {
  addSearchValue,
  searchRecipes,
} from '../../../../store/searchRecipe.slice';
import style from './style.module.css';

const { Search } = Input;

export function SearchBar() {
  const dispatch = useAppDispatch();

  const searchHandle = (searchValue: string) => {
    dispatch(searchRecipes({ value: searchValue, offset: 0 }));
    dispatch(addSearchValue(searchValue));
  };

  return (
    <Search
      placeholder="input search text"
      enterButton
      allowClear
      onSearch={searchHandle}
      className={style.searchBar}
    />
  );
}
