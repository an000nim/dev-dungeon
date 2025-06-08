import { useTranslation } from 'react-i18next';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Мок-данные достижений
const mockAchievements = [
  {
    id: 1,
    title: 'First Quest',
    description: 'Completed your first quest',
    icon: <EmojiEventsIcon color="warning" />,
  },
  {
    id: 2,
    title: 'Team Player',
    description: 'Joined a team',
    icon: <EmojiEventsIcon color="primary" />,
  },
  {
    id: 3,
    title: 'Skillful',
    description: 'Upgraded a skill',
    icon: <EmojiEventsIcon color="success" />,
  },
];

export const AchievementsPage = () => {
  const { t } = useTranslation();
  const achievements = mockAchievements;

  return (
    <RootBox>
      <HeaderBox>
        <Typography variant="h4">
          {t('achievements.title', { defaultValue: 'Achievements' })}
        </Typography>
      </HeaderBox>
      {achievements.length === 0 ? (
        <StyledPaper>
          <Typography variant="h6" color="text.secondary">
            {t('achievements.noAchievements', { defaultValue: 'No achievements yet.' })}
          </Typography>
        </StyledPaper>
      ) : (
        <Grid container spacing={3}>
          {achievements.map((ach) => (
            <Grid item xs={12} md={6} key={ach.id}>
              <StyledPaper>
                <AchievementHeader>
                  <Avatar sx={{ bgcolor: 'background.paper', mr: 2 }}>{ach.icon}</Avatar>
                  <Typography variant="h6">{ach.title}</Typography>
                </AchievementHeader>
                <Typography variant="body2" color="text.secondary">
                  {ach.description}
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
  maxWidth: 900,
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
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: 12,
  boxShadow: theme.shadows[3],
}));

const AchievementHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));
