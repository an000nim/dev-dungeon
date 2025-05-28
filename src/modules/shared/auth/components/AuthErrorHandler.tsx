import { selectIsErrorOccurred } from '@shared/auth/authSlice';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

export const AuthErrorHandler = () => {
  const isErrorOccurred = useAppSelector(selectIsErrorOccurred);

  if (!isErrorOccurred) {
    return null;
  }

  return null;
};
