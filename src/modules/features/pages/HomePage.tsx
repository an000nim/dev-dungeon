import { useAppSelector } from '@app/hooks';
import { selectUser } from '@shared/auth/authSlice';

import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import HomeIcon from '@mui/icons-material/Home';
import { Box, Container, Paper, Typography, styled } from '@mui/material';

export const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const user = useAppSelector(selectUser);

  const getFormattedDate = useCallback(() => {
    const now = new Date();
    const moscowDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const locale = i18n.language === 'en' ? 'en-US' : 'ru-RU';
    const formattedDate = moscowDate.toLocaleDateString(locale, options);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }, [i18n.language]);

  return (
    <RootBox>
      <WelcomeBox>
        <WelcomeTitle>
          <HomeIcon />
          {t('home.dashboard')}
        </WelcomeTitle>
        <WelcomeText>
          {t('home.dateFormat', {
            date: getFormattedDate(),
            name: user?.username || t('profile.username'),
          })}
        </WelcomeText>
      </WelcomeBox>

      <Container maxWidth="xl">
        <CardsContainer>
          <Card>
            <CardHeader gradient="purple">
              <Typography variant="h6">{t('home.character')}</Typography>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader gradient="orange">
              <Typography variant="h6">{t('home.quests')}</Typography>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader gradient="green">
              <Typography variant="h6">{t('home.team')}</Typography>
            </CardHeader>
          </Card>
        </CardsContainer>

        <BottomCardsContainer>
          <BottomCard>
            <CardHeader gradient="orange-yellow">
              <Typography variant="h6">{t('home.achievements')}</Typography>
            </CardHeader>
          </BottomCard>
          <BottomCard>
            <CardHeader gradient="blue-purple">
              <Typography variant="h6">{t('home.activityCalendar')}</Typography>
            </CardHeader>
          </BottomCard>
        </BottomCardsContainer>
      </Container>
    </RootBox>
  );
};

// Styles
const RootBox = styled(Box)({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
});

const WelcomeBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  zIndex: 2,
  padding: 0,
  maxWidth: 600,
  [theme.breakpoints.up('md')]: {
    top: 32,
    left: 48,
  },
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.text.primary,
  ...(theme.palette.mode === 'dark' && { textShadow: '0 2px 8px #000' }),
  '& svg': {
    color: theme.palette.primary.main,
    fontSize: 36,
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 20,
  ...(theme.palette.mode === 'dark' && { textShadow: '0 2px 8px #000' }),
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  justifyContent: 'flex-start',
  marginTop: 40,
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: 24,
  },
}));

const BottomCardsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  marginTop: 24,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: 24,
  },
}));

const Card = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 320,
  borderRadius: 16,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 24,
  [theme.breakpoints.up('md')]: {
    flex: '1 1 350px',
    minWidth: 350,
    maxWidth: 420,
    marginBottom: 0,
  },
}));

const BottomCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 220,
  borderRadius: 16,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 24,
  [theme.breakpoints.up('md')]: {
    flex: '1 1 0',
    minWidth: 0,
    marginBottom: 0,
  },
}));

interface CardHeaderProps {
  gradient: 'purple' | 'orange' | 'green' | 'orange-yellow' | 'blue-purple';
}

const CardHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'gradient',
})<CardHeaderProps>(({ gradient }) => ({
  padding: '16px 24px',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  background:
    gradient === 'purple'
      ? 'linear-gradient(90deg, #9C27FF 0%, #4F8CFF 100%)'
      : gradient === 'orange'
      ? 'linear-gradient(90deg, #FF5C5C 0%, #FF8C4F 100%)'
      : gradient === 'green'
      ? 'linear-gradient(90deg, #1CB56E 0%, #4F8CFF 100%)'
      : gradient === 'orange-yellow'
      ? 'linear-gradient(90deg, #FF8C4F 0%, #FFD600 100%)'
      : 'linear-gradient(90deg, #4F8CFF 0%, #9C27FF 100%)',
  '& h6': {
    color: '#fff',
    fontWeight: 700,
  },
}));
