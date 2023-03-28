import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { searchRecipes } from '../../../../store/searchRecipe.slice';
import style from './style.module.css';

const { Search } = Input;

export function SearchBar() {
  const dispatch = useAppDispatch();
  const { offset } = useAppSelector((state) => state.searchedRecipes);

  const searchHandle = (searchValue: string) => {
    dispatch(searchRecipes({ value: searchValue, offset }));
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
