import { useMemo } from 'react';

import AuthStorage from '../utils/authStorage';

const useAuthStorage = () => {
  return useMemo(() => new AuthStorage(), []);
};

export default useAuthStorage;
