import {useUnit} from 'effector-react';
import {useEffect} from 'react';

import {$uid, signInFx} from '@/store/auth';

const App = () => {
  const uid = useUnit($uid);

  useEffect(() => {
    signInFx({
      email: 'victor@mail.com',
      password: '123456',
    });
  }, []);
  return <>UID: {String(uid)}</>;
};

export default App;
