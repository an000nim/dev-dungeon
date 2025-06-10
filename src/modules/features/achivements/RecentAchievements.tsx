import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

export type Achievement = {
  id: number;
  key: string;
  icon: React.ReactNode;
};

interface RecentAchievementsProps {
  achievements: Achievement[];
}

export const RecentAchievements = ({ achievements }: RecentAchievementsProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const shown = achievements.slice(0, 6);

  return (
    <AchievementsContent>
      <Grid container spacing={3}>
        {shown.map((ach) => (
          <Grid item xs={12} sm={6} md={4} key={ach.id}>
            <AchievementCard>
              <AvatarBox>
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
              </AvatarBox>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 0.5,
                }}
              >
                {t(`achievements.items.${ach.key}.title`)}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {t(`achievements.items.${ach.key}.description`)}
              </Typography>
            </AchievementCard>
          </Grid>
        ))}
      </Grid>
      <ShowAllButtonBox>
        <ShowAllButton onClick={() => navigate('/achievements')}>
          {t('achievements.viewAll')}&nbsp;→
        </ShowAllButton>
      </ShowAllButtonBox>
    </AchievementsContent>
  );
};

const AchievementsContent = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  padding: '32px 24px 16px 24px',
}));

const AchievementCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(44,44,52,0.04)',
  borderRadius: 12,
  padding: '24px 12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 160,
  height: '100%',
  justifyContent: 'center',
}));

const AvatarBox = styled(Box)({
  marginBottom: 12,
});

const ShowAllButtonBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 16,
});

const ShowAllButton = styled(Button)(({ theme }) => ({
  color: '#FFD600',
  fontWeight: 600,
  fontSize: 18,
  background: 'none',
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    background: 'none',
    textDecoration: 'underline',
  },
}));
