import { ColorRing } from 'react-loader-spinner';

const Spinner = () => (
  <div className='empty-container'>
    <ColorRing
      visible={true}
      height='55'
      width='55'
      ariaLabel='blocks-loading'
      wrapperStyle={{ alignSelf: 'center' }}
      wrapperClass='blocks-wrapper'
      colors={['#40c057', '#40c057', '#40c057', '#40c057', '#40c057']}
    />
  </div>
);

export default Spinner;
