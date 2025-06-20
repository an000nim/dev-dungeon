import { useGetUserQuery } from '@features/user/userApi';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

export const RecentProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: userData } = useGetUserQuery();
  const { t } = useTranslation();

  const isMobile = useMediaQuery('(max-width:600px)');
  const isNarrow = useMediaQuery('(max-width:900px)');
  const isMedium = useMediaQuery('(max-width:1200px)');
  const isSmall = useMediaQuery('(max-width:1000px)');
  const isTiny = useMediaQuery('(max-width:800px)');

  // Более агрессивные динамические размеры
  const avatarSize = isMobile ? 70 : isTiny ? 80 : 90;
  const nameSize = isMobile ? 18 : isTiny ? 20 : isNarrow ? 28 : isSmall ? 18 : isMedium ? 20 : 24;
  const levelSize = isMobile ? 12 : isTiny ? 13 : isNarrow ? 16 : isSmall ? 12 : isMedium ? 13 : 14;
  const iconSize = isMobile ? 16 : isTiny ? 16 : isNarrow ? 24 : isSmall ? 16 : isMedium ? 18 : 20;
  const textSize = isMobile ? 11 : isTiny ? 12 : isNarrow ? 16 : isSmall ? 11 : isMedium ? 12 : 14;
  const gap = isMobile ? 6 : isTiny ? 8 : isNarrow ? 16 : isSmall ? 8 : isMedium ? 10 : 12;
  const cardGap = Math.max(gap - 2, 4);
  const statTextSize = Math.max(textSize - 1, 10);
  const statNumberSize = Math.min(nameSize + 2, 28);

  // Адаптивная высота полосок прогресса
  const experienceBarHeight = isNarrow ? 12 : 16;
  const statBarHeight = isNarrow ? 8 : 12;

  return (
    <ProfileCard key="profile-card-v5">
      <HeaderGradient>
        <Typography
          variant="h5"
          sx={{ color: '#fff', fontWeight: 600, fontSize: isTiny ? '18px' : '20px' }}
        >
          {t('profile.titleBlock')}
        </Typography>
      </HeaderGradient>
      <ContentBox style={{ padding: `${Math.max(gap, 12)}px` }}>
        <FlexContainer isNarrow={isNarrow} style={{ gap: `${gap}px` }}>
          {/* Узкий режим - все элементы по центру */}
          <InfoSection isNarrow={isNarrow}>
            <AvatarSection
              isNarrow={isNarrow}
              style={{
                marginBottom: `${gap}px`,
              }}
            >
              <StyledAvatar
                src={userData?.avatar || undefined}
                alt="Character"
                style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
              >
                {!userData?.avatar && <PersonIcon sx={{ fontSize: `${avatarSize * 0.6}px` }} />}
              </StyledAvatar>
            </AvatarSection>

            <UserInfo isNarrow={isNarrow} style={{ marginBottom: `${Math.max(gap, 12)}px` }}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.primary,
                  mb: 0.5,
                  fontSize: `${nameSize}px`,
                  lineHeight: 1.1,
                  textAlign: 'center',
                }}
              >
                {userData?.username || t('profile.card.nameNotLoaded')}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.secondary.main,
                  mb: 1,
                  fontSize: `${levelSize}px`,
                  textAlign: 'center',
                }}
              >
                {userData
                  ? `${t('profile.level', { level: userData.level || 1 })} • ${
                      userData.role || t('profile.card.newbie')
                    }`
                  : t('profile.card.levelUnknown')}
              </Typography>
            </UserInfo>

            <StatsBox
              isNarrow={true}
              style={{ gap: `${gap}px`, marginBottom: `${Math.max(gap, 12)}px` }}
            >
              <StatItem style={{ gap: `${Math.max(gap - 4, 4)}px` }}>
                <StarIcon sx={{ color: '#FFD600', fontSize: `${iconSize}px` }} />
                <Typography
                  sx={{
                    color: '#FFD600',
                    whiteSpace: 'nowrap',
                    fontSize: `${textSize}px`,
                  }}
                >
                  {t('profile.card.reputationLabel')}{' '}
                  {userData?.reputation || t('profile.card.unknownValue')}
                </Typography>
              </StatItem>
              <StatItem style={{ gap: `${Math.max(gap - 4, 4)}px` }}>
                <EmojiEventsIcon sx={{ color: '#4CAF50', fontSize: `${iconSize}px` }} />
                <Typography
                  sx={{
                    color: '#4CAF50',
                    whiteSpace: 'nowrap',
                    fontSize: `${textSize}px`,
                  }}
                >
                  {t('profile.card.achievementsLabel')}{' '}
                  {userData?.achievements || t('profile.card.unknownValue')}
                </Typography>
              </StatItem>
            </StatsBox>

            <ExperienceSection
              isNarrow={isNarrow}
              style={{ marginBottom: `${Math.max(gap, 16)}px` }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.primary, fontSize: `${textSize}px` }}
                >
                  {t('profile.card.experienceLabel')}
                </Typography>
                <Typography variant="body2" sx={{ color: '#FFD600', fontSize: `${textSize}px` }}>
                  {userData
                    ? `${userData.xp || 0}/${userData.xpMax || 1000}`
                    : t('profile.card.unknownProgress')}
                </Typography>
              </Box>
              <ExperienceBar
                variant="determinate"
                value={userData ? ((userData.xp || 0) / (userData.xpMax || 1000)) * 100 : 0}
                sx={{ height: `${experienceBarHeight}px` }}
              />
            </ExperienceSection>

            <StatsGrid style={{ gap: `${cardGap}px`, marginBottom: `${Math.max(gap, 16)}px` }}>
              <StatBox style={{ padding: `${Math.max(gap - 4, 8)}px` }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#FF5C5C',
                    fontWeight: 700,
                    fontSize: `${statNumberSize}px`,
                    lineHeight: 1,
                  }}
                >
                  {userData?.skills?.strength || t('profile.card.unknownValue')}
                </Typography>
                <StatBar
                  variant="determinate"
                  value={userData?.skills?.strength || 0}
                  color="error"
                  sx={{ height: `${statBarHeight}px` }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: `${statTextSize}px`,
                    mt: 0.5,
                  }}
                >
                  {t('profile.strength')}
                </Typography>
              </StatBox>
              <StatBox style={{ padding: `${Math.max(gap - 4, 8)}px` }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#4F8CFF',
                    fontWeight: 700,
                    fontSize: `${statNumberSize}px`,
                    lineHeight: 1,
                  }}
                >
                  {userData?.skills?.intelligence || t('profile.card.unknownValue')}
                </Typography>
                <StatBar
                  variant="determinate"
                  value={userData?.skills?.intelligence || 0}
                  color="primary"
                  sx={{ height: `${statBarHeight}px` }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: `${statTextSize}px`,
                    mt: 0.5,
                  }}
                >
                  {t('profile.intelligence')}
                </Typography>
              </StatBox>
              <StatBox style={{ padding: `${Math.max(gap - 4, 8)}px` }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#1CB56E',
                    fontWeight: 700,
                    fontSize: `${statNumberSize}px`,
                    lineHeight: 1,
                  }}
                >
                  {userData?.skills?.agility || t('profile.card.unknownValue')}
                </Typography>
                <StatBar
                  variant="determinate"
                  value={userData?.skills?.agility || 0}
                  color="success"
                  sx={{ height: `${statBarHeight}px` }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: `${statTextSize}px`,
                    mt: 0.5,
                  }}
                >
                  {t('profile.agility')}
                </Typography>
              </StatBox>
            </StatsGrid>
          </InfoSection>
        </FlexContainer>
        <SettingsButton
          onClick={() => navigate('/profile')}
          style={{
            padding: `${Math.max(gap, 8)}px`,
            fontSize: `${Math.max(textSize, 12)}px`,
          }}
        >
          <PersonIcon sx={{ mr: 1, fontSize: `${iconSize}px` }} />
          {t('profile.edit')}
        </SettingsButton>
      </ContentBox>
    </ProfileCard>
  );
};

const ProfileCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 16,
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  border: `1px solid ${theme.palette.divider}`,
}));

const HeaderGradient = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  padding: '16px 24px',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  boxSizing: 'border-box',
}));

const ContentBox = styled(Box)({
  padding: '24px',
  height: 'calc(100% - 64px)', // Вычитаем высоту шапки
  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxSizing: 'border-box',
});

const FlexContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isNarrow',
})<{ isNarrow: boolean }>(({ isNarrow }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isNarrow ? 'center' : 'flex-start',
  flex: 1,
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  minHeight: 0, // Позволяет flex-элементам сжиматься
}));

const AvatarSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isNarrow',
})<{ isNarrow: boolean }>(({ isNarrow }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  border: '4px solid #FFD600',
  borderRadius: '50%',
  background: theme.palette.mode === 'dark' ? '#2A2B2F' : '#f8f9fa',
  '& img': {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
}));

const InfoSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isNarrow',
})<{ isNarrow: boolean }>(({ isNarrow }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  textAlign: isNarrow ? 'center' : 'left',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  minHeight: 0, // Позволяет flex-элементам сжиматься
}));

const StatsBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isNarrow',
})<{ isNarrow: boolean }>(({ isNarrow }) => ({
  display: 'flex',
  justifyContent: isNarrow ? 'center' : 'flex-start',
  flexWrap: 'nowrap',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
}));

const StatItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  minWidth: 0, // Позволяет элементу сжиматься
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const ExperienceSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isNarrow',
})<{ isNarrow: boolean }>(({ isNarrow }) => ({
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  boxSizing: 'border-box',
}));

const ExperienceBar = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #FFD600 100%)`,
    borderRadius: 6,
  },
}));

const StatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  boxSizing: 'border-box',
});

const StatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.06)',
  borderRadius: 14,
  padding: '16px',
  textAlign: 'center',
  minWidth: 0, // Позволяет элементу сжиматься
  overflow: 'hidden',
  wordWrap: 'break-word',
  boxShadow: theme.shadows[1],
}));

const StatBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)',
  border: `1px solid ${theme.palette.divider}`,
  width: '100%',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
  '&.MuiLinearProgress-colorPrimary .MuiLinearProgress-bar': {
    backgroundColor: '#4F8CFF',
  },
  '&.MuiLinearProgress-colorError .MuiLinearProgress-bar': {
    backgroundColor: '#FF5C5C',
  },
  '&.MuiLinearProgress-colorSuccess .MuiLinearProgress-bar': {
    backgroundColor: '#1CB56E',
  },
}));

const SettingsButton = styled(Button)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  background: theme.palette.primary.main,
  color: '#fff',
  borderRadius: 12,
  textTransform: 'none',
  fontSize: 16,
  padding: '12px 24px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  marginTop: 'auto', // Прижимаем кнопку к низу
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

const UserInfo = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isNarrow',
})<{ isNarrow: boolean }>(({ isNarrow }) => ({}));
