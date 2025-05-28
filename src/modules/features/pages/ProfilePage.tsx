import { useAppSelector } from '@app/hooks';
import { RootState } from '@app/store';
import type { User } from '@shared/auth/types';

import { useTranslation } from 'react-i18next';

import { Avatar, Box, Paper, Typography, styled } from '@mui/material';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state: RootState) => state.auth.user) as User | null;

  console.log('ProfilePage: user:', user);

  if (!user) {
    return (
      <RootBox>
        <ProfilePaper>
          <Typography variant="h5">{t('profile.title')}</Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {t('profile.noUser', { defaultValue: 'Please log in to view your profile.' })}
          </Typography>
        </ProfilePaper>
      </RootBox>
    );
  }

  return (
    <RootBox>
      <ProfilePaper>
        <ProfileContent>
          <ProfileAvatar alt={user.username || ''} src={user.avatar || ''} />
          <Typography variant="h4" gutterBottom>
            {t('profile.title')}
          </Typography>
          <ProfileInfo>
            <Typography variant="h6" gutterBottom>
              {t('profile.username')}: {user.username}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('profile.email')}: {user.email}
            </Typography>
          </ProfileInfo>
        </ProfileContent>
      </ProfilePaper>
    </RootBox>
  );
};

// Styles
const RootBox = styled(Box)({
  padding: 24,
});

const ProfilePaper = styled(Paper)({
  padding: 24,
});

const ProfileContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
});

const ProfileAvatar = styled(Avatar)({
  width: 100,
  height: 100,
});

const ProfileInfo = styled(Box)({
  width: '100%',
  maxWidth: 400,
});
