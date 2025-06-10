import { selectUser } from '@shared/auth/authSlice';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useTranslation } from 'react-i18next';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarIcon from '@mui/icons-material/Star';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Мок-данные для примера (заменить на реальные данные из API)
const mockStats = {
  level: 15,
  xp: 7500,
  nextLevel: 10000,
  completedQuests: 24,
  activeQuests: 3,
  teamProjects: 8,
  skills: 12,
  achievements: 7,
};

export const ProfilePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const user = useAppSelector(selectUser);

  return (
    <RootBox>
      <HeaderBox>
        <Typography variant="h4">{t('profile.title')}</Typography>
        <Button variant="contained" color="primary">
          {t('profile.edit')}
        </Button>
      </HeaderBox>

      <Grid container spacing={3}>
        {/* Основная информация */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <ProfileHeader>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: theme.palette.primary.main,
                  fontSize: 48,
                }}
              >
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
                {user?.username || t('profile.username')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email || t('profile.email')}
              </Typography>
              <Chip
                icon={<StarIcon />}
                label={`Level ${mockStats.level}`}
                color="primary"
                sx={{ mt: 2 }}
              />
            </ProfileHeader>
            <Divider sx={{ my: 2 }} />
            <ProfileStats>
              <StatItem>
                <MonetizationOnIcon color="primary" />
                <Typography variant="h6">{user?.coins || 0}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('profile.coins')}
                </Typography>
              </StatItem>
              <StatItem>
                <EmojiEventsIcon color="primary" />
                <Typography variant="h6">{mockStats.achievements}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('profile.achievements')}
                </Typography>
              </StatItem>
            </ProfileStats>
          </StyledPaper>
        </Grid>

        {/* Прогресс и активность */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Прогресс уровня */}
            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t('profile.levelProgress')}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(mockStats.xp / mockStats.nextLevel) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {mockStats.xp} / {mockStats.nextLevel} XP
                </Typography>
              </StyledPaper>
            </Grid>

            {/* Статистика активности */}
            <Grid item xs={12} sm={6}>
              <StyledPaper>
                <ActivityHeader>
                  <ListAltIcon color="primary" />
                  <Typography variant="h6">{t('profile.quests')}</Typography>
                </ActivityHeader>
                <ActivityContent>
                  <ActivityItem>
                    <Typography variant="body2" color="text.secondary">
                      {t('profile.completedQuests')}
                    </Typography>
                    <Typography variant="h6">{mockStats.completedQuests}</Typography>
                  </ActivityItem>
                  <ActivityItem>
                    <Typography variant="body2" color="text.secondary">
                      {t('profile.activeQuests')}
                    </Typography>
                    <Typography variant="h6">{mockStats.activeQuests}</Typography>
                  </ActivityItem>
                </ActivityContent>
              </StyledPaper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledPaper>
                <ActivityHeader>
                  <GroupIcon color="primary" />
                  <Typography variant="h6">{t('profile.team')}</Typography>
                </ActivityHeader>
                <ActivityContent>
                  <ActivityItem>
                    <Typography variant="body2" color="text.secondary">
                      {t('profile.teamProjects')}
                    </Typography>
                    <Typography variant="h6">{mockStats.teamProjects}</Typography>
                  </ActivityItem>
                  <ActivityItem>
                    <Typography variant="body2" color="text.secondary">
                      {t('profile.skills')}
                    </Typography>
                    <Typography variant="h6">{mockStats.skills}</Typography>
                  </ActivityItem>
                </ActivityContent>
              </StyledPaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RootBox>
  );
};

// ===== Стили =====
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
  height: '100%',
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const ProfileStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: theme.spacing(2),
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const ActivityHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ActivityContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ActivityItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
