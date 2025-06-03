import { useGetUserProfileQuery } from '@features/user/userApi';

import { useTranslation } from 'react-i18next';

import { Avatar, Paper as MuiPaper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { data: user, isLoading, error } = useGetUserProfileQuery();

  if (isLoading) {
    return (
      <PaddedBox>
        <StyledPaper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5">{t('profile.title')}</Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {t('profile.loading', { defaultValue: 'Loading...' })}
          </Typography>
        </StyledPaper>
      </PaddedBox>
    );
  }

  if (error || !user) {
    return (
      <PaddedBox>
        <StyledPaper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5">{t('profile.title')}</Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {t('profile.noUser', { defaultValue: 'Please log in to view your profile.' })}
          </Typography>
        </StyledPaper>
      </PaddedBox>
    );
  }

  return (
    <PaddedBox>
      <StyledPaper sx={{ p: 3 }}>
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
      </StyledPaper>
    </PaddedBox>
  );
};

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

const StyledPaper = styled(MuiPaper)({});

export default ProfilePage;
