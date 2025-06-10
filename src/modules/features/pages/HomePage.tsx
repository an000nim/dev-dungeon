import { RecentAchievements } from '@features/achivements/RecentAchievements';
import { selectUser } from '@shared/auth/authSlice';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useTranslation } from 'react-i18next';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box, Paper, styled } from '@mui/material';

export const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const user = useAppSelector(selectUser);
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

  // Мок-данные достижений (временно, до подключения бэка)
  const mockAchievements = [
    {
      id: 1,
      key: 'codeMaster',
      icon: <EmojiEventsIcon sx={{ color: 'url(#grad1)' }} />,
    },
    {
      id: 2,
      key: 'bugHunter',
      icon: <EmojiEventsIcon sx={{ color: '#FF5C5C' }} />,
    },
    {
      id: 3,
      key: 'teamPlayer',
      icon: <EmojiEventsIcon sx={{ color: '#1CB56E' }} />,
    },
    {
      id: 4,
      key: 'nightCoder',
      icon: <EmojiEventsIcon sx={{ color: '#9C27FF' }} />,
    },
    {
      id: 5,
      key: 'firstSteps',
      icon: <EmojiEventsIcon sx={{ color: '#FFD600' }} />,
    },
    {
      id: 6,
      key: 'mentor',
      icon: <EmojiEventsIcon sx={{ color: '#B388FF' }} />,
    },
    {
      id: 7,
      key: 'extra',
      icon: <EmojiEventsIcon sx={{ color: '#4F8CFF' }} />,
    },
  ];

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
            <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}>
              {t('home.character')}
            </Typography>
          </CardHeader>
        </StyledPaper>
        <StyledPaper isNarrow={isNarrow} gridarea="quests">
          <CardHeader gradient="quests">
            <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}>
              {t('home.quests')}
            </Typography>
          </CardHeader>
        </StyledPaper>
        <StyledPaper isNarrow={isNarrow} gridarea="team">
          <CardHeader gradient="team">
            <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}>
              {t('home.team')}
            </Typography>
          </CardHeader>
        </StyledPaper>
        <StyledPaper isNarrow={isNarrow} gridarea="achievements" short>
          <CardHeader gradient="achievements">
            <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}>
              {t('home.achievements')}
            </Typography>
          </CardHeader>
          <RecentAchievements achievements={mockAchievements} />
        </StyledPaper>
        <StyledPaper isNarrow={isNarrow} gridarea="calendar" short>
          <CardHeader gradient="calendar">
            <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: 0.2 }}>
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
  paddingTop: theme.spacing(1.5),
  paddingLeft: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
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
  display: isNarrow ? 'flex' : 'grid',
  flexDirection: isNarrow ? 'column' : undefined,
  gap: isNarrow ? 0 : theme.spacing(1.5),
  gridTemplateColumns: isNarrow ? undefined : 'repeat(6, 1fr)',
  gridAutoFlow: isNarrow ? undefined : 'row',
  paddingTop: theme.spacing(1.5),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
}));

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isNarrow' && prop !== 'gridarea' && prop !== 'short',
})<{
  isNarrow: boolean;
  gridarea?: 'character' | 'quests' | 'team' | 'achievements' | 'calendar';
  short?: boolean;
}>(({ theme, isNarrow, gridarea, short }) => {
  let gridStyles = {};
  let minHeight = undefined;
  if (!isNarrow && gridarea === 'achievements') {
    gridStyles = { gridColumn: '1 / span 3', gridRow: '2' };
  } else if (!isNarrow && gridarea === 'calendar') {
    gridStyles = { gridColumn: '4 / span 3', gridRow: '2' };
  } else if (!isNarrow && gridarea === 'character') {
    gridStyles = { gridColumn: '1 / span 2', gridRow: '1' };
    minHeight = 160;
  } else if (!isNarrow && gridarea === 'quests') {
    gridStyles = { gridColumn: '3 / span 2', gridRow: '1' };
    minHeight = 160;
  } else if (!isNarrow && gridarea === 'team') {
    gridStyles = { gridColumn: '5 / span 2', gridRow: '1' };
    minHeight = 160;
  } else if (isNarrow) {
    minHeight = short ? 110 : 160;
  }
  return {
    marginBottom: isNarrow ? 12 : 0,
    width: isNarrow ? '100%' : undefined,
    minHeight,
    borderRadius: 8,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    display: 'flex',
    flexDirection: 'column',
    position: isNarrow ? 'static' : undefined,
    ...gridStyles,
  };
});

const CardHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'gradient',
})<{ gradient: 'character' | 'quests' | 'team' | 'achievements' | 'calendar' }>(
  ({ theme, gradient }) => ({
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
