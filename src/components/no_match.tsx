import * as React from 'react';
import { publicUrl } from '../utils/common';
import { IndexedObject } from '../utils/type';
import { Helmet } from 'react-helmet';

const NoMatch: React.FC<IndexedObject> = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Helmet>
        <title>404</title>
      </Helmet>
      <img src={publicUrl('/images/404.png')} alt="404" />
    </div>
  );
};

export default NoMatch;
