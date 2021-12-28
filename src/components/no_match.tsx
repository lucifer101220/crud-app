import * as React from 'react';
import { IndexedObject } from '../utils/type';

const NoMatch: React.FC<IndexedObject> = () => {
  return (
    <div className="Article">
      <div>
        <h1>NO MATCH PAGE</h1>
      </div>
    </div>
  );
};

export default NoMatch;
