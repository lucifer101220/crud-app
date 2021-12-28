import * as React from 'react';
import { useState } from 'react';
import { IndexedObject } from '../utils/type';

const WelcomePage: React.FC<IndexedObject> = () => {
  const [say, setSay] = useState('hello');
  return (
    <div className="Article">
      <div>
        <h1>Welcome Page {say}</h1>
      </div>
    </div>
  );
};

export default WelcomePage;
