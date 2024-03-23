import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {

  return (
    <div className='d-flex w-100 justify-content-center align-items-center flex-column animate_animated animate__fadeIn m-5'>
      <ReactLoading type='spokes' color='#98a8ea' height={'10%'} width={'10%'} />
    </div>
  );
};
export default Loading;