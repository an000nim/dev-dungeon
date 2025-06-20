import { useGetUserQuery } from '@features/user/userApi';

import { useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SaveIcon from '@mui/icons-material/Save';
import StarIcon from '@mui/icons-material/Star';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  styled,
} from '@mui/material';

const RootBox = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  marginTop: theme.spacing(6),
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: theme.shadows[4],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.palette.background.paper,
}));

const AvatarBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const BigAvatar = styled(Avatar)(({ theme }) => ({
  width: 140,
  height: 140,
  border: '4px solid #FFD600',
  boxShadow: '0 0 0 4px #23233a',
  background: '#fff',
  fontSize: 48,
}));

const EditAvatarButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: 8,
  right: 8,
  minWidth: 0,
  padding: 6,
  borderRadius: '50%',
  background: theme.palette.primary.main,
  color: '#fff',
  boxShadow: theme.shadows[2],
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(44,44,52,0.04)',
  boxShadow: theme.shadows[1],
}));

const SkillsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: theme.spacing(2),
  width: '100%',
  marginTop: theme.spacing(2),
}));

const SkillBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.06)',
  borderRadius: 14,
  padding: theme.spacing(2, 2, 1, 2),
  minWidth: 110,
  boxShadow: theme.shadows[1],
}));

export const ProfilePage = () => {
  const { t } = useTranslation();
  const { data: userData } = useGetUserQuery();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(userData?.username || '');
  const [avatar, setAvatar] = useState(userData?.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Синхронизируем локальное состояние при загрузке данных
  if (userData && (username !== userData.username || avatar !== userData.avatar) && !editMode) {
    setUsername(userData.username ?? '');
    setAvatar(userData.avatar ?? '');
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setUsername(userData?.username || '');
    setAvatar(userData?.avatar || '');
  };
  const handleSave = () => {
    // Здесь будет запрос на сервер, пока только локально
    setEditMode(false);
  };

  return (
    <RootBox>
      <StyledPaper>
        <AvatarBox>
          <BigAvatar src={avatar} alt={username} />
          {editMode && (
            <>
              <EditAvatarButton onClick={() => fileInputRef.current?.click()}>
                <EditIcon fontSize="small" />
              </EditAvatarButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </>
          )}
        </AvatarBox>
        {editMode ? (
          <TextField
            label={t('profile.username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2, mt: 1 }}
          />
        ) : (
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, mt: 1 }}>
            {username}
          </Typography>
        )}
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          {userData?.role || ''}
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <StatCard>
              <MonetizationOnIcon color="primary" />
              <Box>
                <Typography variant="h6">{userData?.coins || 0}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('profile.coins')}
                </Typography>
              </Box>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard>
              <StarIcon color="primary" />
              <Box>
                <Typography variant="h6">{userData?.reputation || 0}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('profile.reputation')}
                </Typography>
              </Box>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard>
              <EmojiEventsIcon color="primary" />
              <Box>
                <Typography variant="h6">{userData?.achievements || 0}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('profile.achievements')}
                </Typography>
              </Box>
            </StatCard>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, width: '100%' }} />
        <Box width="100%" mb={2}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {t('profile.level', { level: 12 })}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={userData?.xp && userData?.xpMax ? (userData.xp / userData.xpMax) * 100 : 0}
            sx={(theme) => ({
              height: 10,
              borderRadius: 5,
              backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
              border: `1px solid ${theme.palette.divider}`,
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #FFD600 0%, #9C27FF 100%)',
                borderRadius: 5,
              },
            })}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {userData?.xp || 0} / {userData?.xpMax || 1000} XP
          </Typography>
        </Box>
        <SkillsGrid>
          <SkillBox>
            <Typography variant="h5" color="#FF5C5C" fontWeight={700}>
              {userData?.skills?.strength || 0}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={userData?.skills?.strength || 0}
              sx={(theme) => ({
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${theme.palette.divider}`,
                width: '100%',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#FF5C5C',
                  borderRadius: 4,
                },
              })}
            />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {t('profile.strength')}
            </Typography>
          </SkillBox>
          <SkillBox>
            <Typography variant="h5" color="#4F8CFF" fontWeight={700}>
              {userData?.skills?.intelligence || 0}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={userData?.skills?.intelligence || 0}
              sx={(theme) => ({
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${theme.palette.divider}`,
                width: '100%',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#4F8CFF',
                  borderRadius: 4,
                },
              })}
            />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {t('profile.intelligence')}
            </Typography>
          </SkillBox>
          <SkillBox>
            <Typography variant="h5" color="#1CB56E" fontWeight={700}>
              {userData?.skills?.agility || 0}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={userData?.skills?.agility || 0}
              sx={(theme) => ({
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${theme.palette.divider}`,
                width: '100%',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#1CB56E',
                  borderRadius: 4,
                },
              })}
            />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {t('profile.agility')}
            </Typography>
          </SkillBox>
        </SkillsGrid>
        <Box display="flex" gap={2} mt={4}>
          {editMode ? (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                {t('common.save', 'Сохранить')}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                {t('common.cancel', 'Отмена')}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              {t('profile.edit')}
            </Button>
          )}
        </Box>
      </StyledPaper>
    </RootBox>
  );
};
