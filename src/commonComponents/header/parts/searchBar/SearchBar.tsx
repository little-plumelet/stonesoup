import { Input } from 'antd';

const { Search } = Input;

const searchHandle = (value: string) => {
  console.log(value);
};

export function SearchBar() {
  return (
    <Search
      placeholder="input search text"
      allowClear
      onSearch={searchHandle}
      style={{ width: 200 }}
    />
  );
}
