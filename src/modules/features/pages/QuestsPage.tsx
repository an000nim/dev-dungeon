import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/material';

// Примерные данные (заменить на реальные из API)
const mockQuests = [
  {
    id: 1,
    title: 'Optimize Code',
    type: 'daily',
    status: 'active',
    progress: 70,
    reward: { xp: 150, coins: 0 },
    deadline: '2024-05-18',
    team: false,
  },
  {
    id: 2,
    title: 'Fix Bugs',
    type: 'team',
    status: 'active',
    progress: 40,
    reward: { xp: 200, coins: 300 },
    deadline: '2024-05-20',
    team: true,
  },
  {
    id: 3,
    title: 'React Course',
    type: 'personal',
    status: 'completed',
    progress: 100,
    reward: { xp: 300, coins: 0 },
    deadline: '2024-05-21',
    team: false,
  },
];

export const QuestsPage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('active');
  const [search, setSearch] = useState('');
  const quests = mockQuests.filter(
    (q) =>
      (tab === 'all' || q.status === tab) && q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RootBox>
      <HeaderBox>
        <Typography variant="h4">{t('quests.title')}</Typography>
        <Button variant="contained" color="primary">
          {t('quests.add')}
        </Button>
      </HeaderBox>
      <FilterBox>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="active" label={t('quests.active')} />
          <Tab value="completed" label={t('quests.completed')} />
          <Tab value="all" label={t('quests.all')} />
        </Tabs>
        <TextField
          size="small"
          placeholder={t('quests.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
      </FilterBox>
      {quests.length === 0 ? (
        <StyledPaper>
          <Typography variant="h6" color="text.secondary">
            {t('quests.noQuests')}
          </Typography>
        </StyledPaper>
      ) : (
        <Grid container spacing={3}>
          {quests.map((quest) => (
            <Grid item xs={12} md={6} key={quest.id}>
              <StyledCard>
                <CardContent>
                  <CardHeaderBox>
                    {quest.type === 'team' ? (
                      <GroupIcon color="primary" />
                    ) : quest.type === 'personal' ? (
                      <PersonIcon color="secondary" />
                    ) : (
                      <TodayIcon color="success" />
                    )}
                    <Typography variant="h6">{quest.title}</Typography>
                    <Chip
                      label={t(`quests.${quest.type}`)}
                      color={
                        quest.type === 'team'
                          ? 'primary'
                          : quest.type === 'personal'
                          ? 'secondary'
                          : 'success'
                      }
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </CardHeaderBox>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {t('quests.deadline')}: {quest.deadline}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={quest.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {t('quests.progress')}: {quest.progress}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('quests.reward')}: {quest.reward.xp} {t('quests.xp')}
                    {quest.reward.coins ? ` + ${quest.reward.coins} ${t('quests.coins')}` : ''}
                  </Typography>
                </CardContent>
                <CardActions>
                  {quest.status === 'active' ? (
                    <Button size="small" color="primary">
                      {t('quests.details')}
                    </Button>
                  ) : (
                    <Button size="small" color="secondary">
                      {t('quests.take')}
                    </Button>
                  )}
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </RootBox>
  );
};

// ===== Стили внизу файла =====
const RootBox = styled(Box)(({ theme }) => ({
  maxWidth: 1000,
  margin: '0 auto',
  marginTop: theme.spacing(6),
  padding: theme.spacing(2),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 4,
  boxShadow: theme.shadows[3],
}));

const CardHeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  gap: theme.spacing(1),
}));
