import * as React from 'react';
import { publicUrl } from '../utils/common';
import { IndexedObject } from '../utils/type';

const NoMatch: React.FC<IndexedObject> = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={publicUrl('/images/404.png')} alt="404" />
    </div>
  );
};

export default NoMatch;
