import * as React from 'react';
import { publicUrl } from '../utils/common';
import { IndexedObject } from '../utils/type';

const WelcomePage: React.FC<IndexedObject> = () => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-20px' }}
    >
      <img
        src={publicUrl('/images/welcome.png')}
        style={{ width: '100%', height: '700px', objectFit: 'cover', objectPosition: '50% 80%' }}
        alt="welcome"
      />
    </div>
  );
};

export default WelcomePage;
