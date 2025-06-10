import { useTranslation } from 'react-i18next';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Avatar, Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

// Мок-данные достижений (те же, что и на главной странице)
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

export const AchievementsPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const achievements = mockAchievements;

  return (
    <RootBox>
      <HeaderBox>
        <Typography variant="h4">{t('achievements.title')}</Typography>
      </HeaderBox>
      {achievements.length === 0 ? (
        <StyledPaper>
          <Typography variant="h6" color="text.secondary">
            {t('achievements.noAchievements')}
          </Typography>
        </StyledPaper>
      ) : (
        <Grid container spacing={3}>
          {achievements.map((ach) => (
            <Grid item xs={12} sm={6} md={4} key={ach.id}>
              <StyledPaper>
                <AchievementHeader>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.mode === 'dark' ? '#fff' : '#9C27FF',
                    }}
                  >
                    {ach.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 700 }}>
                    {t(`achievements.items.${ach.key}.title`)}
                  </Typography>
                </AchievementHeader>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {t(`achievements.items.${ach.key}.description`)}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      )}
    </RootBox>
  );
};

// ===== Стили внизу файла =====
const RootBox = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  marginTop: theme.spacing(6),
  padding: theme.spacing(2),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: theme.shadows[3],
  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(44,44,52,0.04)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const AchievementHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
