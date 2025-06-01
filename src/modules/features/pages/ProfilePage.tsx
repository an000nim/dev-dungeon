import type { User } from '@features/user/types';
import { selectUser } from '@features/user/userSlice';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useTranslation } from 'react-i18next';

import { Avatar, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const PaddedBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CenteredColumnBox = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
}));

const MaxWidthBox = styled('div')(() => ({
  width: '100%',
  maxWidth: 400,
}));

const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser) as User | null;

  if (!user) {
    return (
      <PaddedBox>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5">{t('profile.title')}</Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {t('profile.noUser', { defaultValue: 'Please log in to view your profile.' })}
          </Typography>
        </Paper>
      </PaddedBox>
    );
  }

  return (
    <PaddedBox>
      <Paper sx={{ p: 3 }}>
        <CenteredColumnBox>
          <Avatar
            alt={user.username || ''}
            src={user.avatar || ''}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h4" gutterBottom>
            {t('profile.title')}
          </Typography>
          <MaxWidthBox>
            <Typography variant="h6" gutterBottom>
              {t('profile.username')}: {user.username}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('profile.email')}: {user.email}
            </Typography>
          </MaxWidthBox>
        </CenteredColumnBox>
      </Paper>
    </PaddedBox>
  );
};

export default ProfilePage;
