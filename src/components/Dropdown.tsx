import { FC, ChangeEvent } from 'react';
import { DropdownItem } from '../types/api';
import Label from './Label/Label';

type Props = {
  setValue(value: string): void;
  isLoading: boolean;
  options: DropdownItem[];
  name: string;
  label: string;
};

const Dropdown: FC<Props> = ({ setValue, isLoading, options, name, label }) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    setValue(event.currentTarget.value);
  };

  return (
    <div className='flex gap-1 flex-col'>
      <Label label={label} name={name} />
      <select
        disabled={isLoading}
        onChange={handleSelectChange}
        className='py-3 px-5 w-[200px] text-center border border-gray-300 rounded focus:bg-none cursor-pointer'
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
