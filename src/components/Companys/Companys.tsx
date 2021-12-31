import React from 'react';
import { IndexedObject } from '../../utils/type';
import { Helmet } from 'react-helmet';

const Companys: React.FC<IndexedObject> = () => {
  return (
    <div>
      <Helmet>
        <title>Companys</title>
      </Helmet>
      <h1>Companys page</h1>
    </div>
  );
};

export default Companys;
