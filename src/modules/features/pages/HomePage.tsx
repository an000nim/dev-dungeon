import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useTranslation } from 'react-i18next';

import HomeIcon from '@mui/icons-material/Home';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box, Paper, styled } from '@mui/material';

export const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useTheme();
  const isNarrow = useMediaQuery('(max-width:900px)');

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

  return (
    <RootBox>
      <WelcomeBox>
        <TitleRow>
          <HomeIcon sx={{ color: theme.palette.primary.main, fontSize: 36 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ ml: 1 }}>
            {t('home.dashboard')}
          </Typography>
        </TitleRow>
        <WelcomeSubtitle variant="body1">
          {t('home.dateFormat', {
            date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
            name: user?.username || t('profile.username'),
          })}
        </WelcomeSubtitle>
      </WelcomeBox>
      <GridBox isNarrow={isNarrow}>
        <StyledPaper isNarrow={isNarrow} gridarea="character">
          <CardHeader gradient="character">
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              {t('home.character')}
            </Typography>
          </CardHeader>
        </StyledPaper>
        <StyledPaper isNarrow={isNarrow} gridarea="quests">
          <CardHeader gradient="quests">
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              {t('home.quests')}
            </Typography>
          </CardHeader>
        </StyledPaper>
        <StyledPaper isNarrow={isNarrow} gridarea="team">
          <CardHeader gradient="team">
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              {t('home.team')}
            </Typography>
          </CardHeader>
        </StyledPaper>
        <StyledPaper isNarrow={isNarrow} gridarea="achievements" short>
          <CardHeader gradient="achievements">
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              {t('home.achievements')}
            </Typography>
          </CardHeader>
          {/* <RecentAchievements achievements={mockAchievements} /> */}
        </StyledPaper>
        <StyledPaper isNarrow={isNarrow} gridarea="calendar" short>
          <CardHeader gradient="calendar">
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              {t('home.activityCalendar')}
            </Typography>
          </CardHeader>
        </StyledPaper>
      </GridBox>
    </RootBox>
  );
};

const RootBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.background.default,
}));

const WelcomeBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  paddingRight: 0,
  marginBottom: 0,
}));

const TitleRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const WelcomeSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 20,
  ...(theme.palette.mode === 'dark' && { textShadow: '0 2px 8px #000' }),
}));

const GridBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isNarrow',
})<{ isNarrow: boolean }>(({ theme, isNarrow }) => ({
  width: '100%',
  height: isNarrow ? 'auto' : 'calc(100vh - 120px)',
  display: isNarrow ? 'flex' : 'grid',
  flexDirection: isNarrow ? 'column' : undefined,
  gap: theme.spacing(3),
  gridTemplateColumns: isNarrow ? undefined : 'repeat(6, 1fr)',
  gridTemplateRows: isNarrow ? undefined : '1fr 1fr',
  gridAutoFlow: isNarrow ? undefined : 'row',
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isNarrow' && prop !== 'gridarea' && prop !== 'short',
})<{
  isNarrow: boolean;
  gridarea?: 'character' | 'quests' | 'team' | 'achievements' | 'calendar';
  short?: boolean;
}>(({ theme, isNarrow, gridarea, short }) => ({
  marginBottom: isNarrow ? theme.spacing(3) : 0,
  height: isNarrow ? (short ? 220 : 320) : '100%',
  borderRadius: 16,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  ...(gridarea && !isNarrow
    ? gridarea === 'character'
      ? { gridColumn: '1 / span 2', gridRow: '1' }
      : gridarea === 'quests'
      ? { gridColumn: '3 / span 2', gridRow: '1' }
      : gridarea === 'team'
      ? { gridColumn: '5 / span 2', gridRow: '1' }
      : gridarea === 'achievements'
      ? { gridColumn: '1 / span 3', gridRow: '2' }
      : gridarea === 'calendar'
      ? { gridColumn: '4 / span 3', gridRow: '2' }
      : {}
    : {}),
}));

const CardHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'gradient',
})<{ gradient: 'character' | 'quests' | 'team' | 'achievements' | 'calendar' }>(
  ({ theme, gradient }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    background: (() => {
      switch (gradient) {
        case 'character':
          return 'linear-gradient(90deg, #9C27FF 0%, #4F8CFF 100%)';
        case 'quests':
          return 'linear-gradient(90deg, #FF5C5C 0%, #FF8C4F 100%)';
        case 'team':
          return 'linear-gradient(90deg, #1CB56E 0%, #4F8C4F 100%)';
        case 'achievements':
          return 'linear-gradient(90deg, #FF8C4F 0%, #FFD600 100%)';
        case 'calendar':
          return 'linear-gradient(90deg, #4F8CFF 0%, #9C27FF 100%)';
        default:
          return 'transparent';
      }
    })(),
  })
);
