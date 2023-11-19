import { ChangeEvent, FC } from 'react';
import { useTableContext } from './context';
import Dropdown from '../Dropdown';
import TextInput from '../TextInput/TextInput';

type Props = {
  searchTerm: string;
  setSearchTerm(search: string): void;
};

const Filter: FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const { filters, setSelectedFilter, isFilterLoading } = useTableContext();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='flex flex-1 justify-between'>
      <TextInput
        name='Search'
        label='Search'
        placeholder='Search by name...'
        value={searchTerm}
        onChange={handleOnChange}
      />
      <Dropdown
        name='gitBranch'
        label='Git Branch'
        options={filters}
        setValue={setSelectedFilter}
        isLoading={isFilterLoading}
      />
    </div>
  );
};

export default Filter;
