const SkeletonRow = () => {
  return (
    <tr>
      <td className='border animate-pulse p-2'>
        <div className='w-4 h-4 bg-gray-300 rounded'></div>
      </td>
      <td className='border animate-pulse p-2'>
        <div className='w-full h-4 bg-gray-300 rounded'></div>
      </td>
      <td className='border animate-pulse p-2 '>
        <div className='w-full h-4 bg-gray-300 rounded'></div>
      </td>
      <td className='border animate-pulse p-2 '>
        <div className='w-full h-4 bg-gray-300 rounded'></div>
      </td>
      <td className='border animate-pulse p-2 '>
        <div className='w-full h-4 bg-gray-300 rounded'></div>
      </td>
    </tr>
  );
};

export default SkeletonRow;
