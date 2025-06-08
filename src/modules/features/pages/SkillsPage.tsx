import { useTranslation } from 'react-i18next';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Примерные данные (заменить на реальные из API)
const mockSkills = [
  {
    id: 1,
    name: 'JavaScript',
    level: 4,
    xp: 1200,
    nextLevel: 1500,
    icon: <EmojiEventsIcon color="warning" />,
  },
  {
    id: 2,
    name: 'React',
    level: 3,
    xp: 900,
    nextLevel: 1200,
    icon: <TrendingUpIcon color="primary" />,
  },
];
const mockRecommendations = [
  { id: 3, name: 'TypeScript', icon: <EmojiEventsIcon color="info" /> },
  { id: 4, name: 'Docker', icon: <TrendingUpIcon color="success" /> },
];

export const SkillsPage = () => {
  const { t } = useTranslation();
  const skills = mockSkills; // заменить на реальные данные
  const recommendations = mockRecommendations;

  return (
    <RootBox>
      <HeaderBox>
        <Typography variant="h4">{t('skills.title')}</Typography>
        <Button variant="contained" color="primary">
          {t('skills.add')}
        </Button>
      </HeaderBox>
      {skills.length === 0 ? (
        <StyledPaper>
          <Typography variant="h6" color="text.secondary">
            {t('skills.noSkills')}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            {t('skills.add')}
          </Button>
        </StyledPaper>
      ) : (
        <Grid container spacing={3}>
          {skills.map((skill) => (
            <Grid item xs={12} md={6} key={skill.id}>
              <StyledCard>
                <CardContent>
                  <SkillHeaderBox>
                    <Avatar sx={{ mr: 2, bgcolor: 'background.paper' }}>{skill.icon}</Avatar>
                    <Typography variant="h6">{skill.name}</Typography>
                  </SkillHeaderBox>
                  <Typography variant="body2" color="text.secondary">
                    {t('skills.level')}: {skill.level} | {t('skills.xp')}: {skill.xp}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(skill.xp / skill.nextLevel) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {t('skills.progress')}: {skill.xp} / {skill.nextLevel} XP (
                      {t('skills.nextLevel')})
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    {t('skills.upgrade')}
                  </Button>
                  <Button size="small" color="secondary">
                    {t('skills.details')}
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
      {/* Рекомендации */}
      <RecommendationsBox>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('skills.recommendedForYou')}
        </Typography>
        <Grid container spacing={2}>
          {recommendations.map((rec) => (
            <Grid item key={rec.id}>
              <Button
                variant="outlined"
                startIcon={<Avatar sx={{ bgcolor: 'background.paper' }}>{rec.icon}</Avatar>}
              >
                {rec.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </RecommendationsBox>
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
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 4,
  boxShadow: theme.shadows[3],
}));

const SkillHeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const RecommendationsBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));
