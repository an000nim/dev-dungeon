import { useTranslation } from 'react-i18next';

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Примерные данные (заменить на реальные из API)
const mockTeams = [
  {
    id: 1,
    name: 'Backend Guild',
    level: 15,
    members: [
      { id: 1, name: 'Anna', avatar: '' },
      { id: 2, name: 'Dmitry', avatar: '' },
      { id: 3, name: 'Elena', avatar: '' },
      { id: 4, name: 'Ivan', avatar: '' },
    ],
  },
  {
    id: 2,
    name: 'Frontend Wizards',
    level: 8,
    members: [
      { id: 5, name: 'Max', avatar: '' },
      { id: 6, name: 'Olga', avatar: '' },
    ],
  },
];

export const TeamsPage = () => {
  const { t } = useTranslation();
  const teams = mockTeams; // заменить на реальные данные

  return (
    <RootBox>
      <HeaderBox>
        <Typography variant="h4">{t('teams.title', { defaultValue: 'Teams' })}</Typography>
        <Button variant="contained" color="primary">
          {t('teams.createOrJoin', { defaultValue: 'Create or Join Team' })}
        </Button>
      </HeaderBox>
      {teams.length === 0 ? (
        <StyledPaper>
          <Typography variant="h6" color="text.secondary">
            {t('teams.noTeams', { defaultValue: 'You are not a member of any team yet.' })}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            {t('teams.createOrJoin', { defaultValue: 'Create or Join Team' })}
          </Button>
        </StyledPaper>
      ) : (
        <Grid container spacing={3}>
          {teams.map((team) => (
            <Grid item xs={12} md={6} key={team.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {team.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {t('teams.level', { defaultValue: 'Level' })}: {team.level}
                  </Typography>
                  <AvatarGroup max={5} sx={{ mb: 1 }}>
                    {team.members.map((m) => (
                      <Avatar key={m.id} alt={m.name} src={m.avatar} />
                    ))}
                  </AvatarGroup>
                  <Typography variant="body2" color="text.secondary">
                    {t('teams.members', { defaultValue: 'Members' })}: {team.members.length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    {t('teams.details', { defaultValue: 'View Details' })}
                  </Button>
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
