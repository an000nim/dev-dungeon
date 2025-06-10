import { selectUser } from '@shared/auth/authSlice';
import { keycloak } from '@shared/auth/config/keycloak';
import { useLanguage } from '@shared/i18n/hooks/useLanguage';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Avatar, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Box, styled } from '@mui/material';

export const TopBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { currentLanguage, changeLanguage } = useLanguage();
  const coins = user?.coins ?? 0;

  return (
    <StyledAppBar position="static" elevation={0}>
      <StyledToolbar>
        <GrowBox />
        <LangSwitcherBox>
          <LangButton isActive={currentLanguage === 'ru'} onClick={() => changeLanguage('ru')}>
            RU
          </LangButton>
          <LangButton isActive={currentLanguage === 'en'} onClick={() => changeLanguage('en')}>
            EN
          </LangButton>
        </LangSwitcherBox>
        <SettingsBox>
          <IconButton color="inherit" onClick={() => navigate('/settings')}>
            <SettingsIcon />
          </IconButton>
        </SettingsBox>
        <CoinsBox>
          <CoinIconBox>
            <MonetizationOnIcon sx={{ color: '#FFD600', fontSize: 28 }} />
          </CoinIconBox>
          <CoinsValue>{coins}</CoinsValue>
        </CoinsBox>
        <UserBox>
          {user ? (
            <Tooltip title={user.username}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt={user.username} src={user.avatar || ''} />
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton color="inherit" onClick={() => keycloak.login()} sx={{ minWidth: 64 }}>
              {t('nav.login')}
            </IconButton>
          )}
        </UserBox>
      </StyledToolbar>
    </StyledAppBar>
  );
};

// ===== Стили внизу файла =====
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: 48,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingLeft: 0,
  paddingRight: 0,
});

const GrowBox = styled(Box)({
  flexGrow: 1,
});

const LangSwitcherBox = styled(Box)(({ theme }) => ({
  width: 88,
  display: 'flex',
  borderRadius: 2,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

const LangButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  width: 44,
  textAlign: 'center',
  fontWeight: 700,
  fontSize: 14,
  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': { backgroundColor: theme.palette.action.hover },
}));

const SettingsBox = styled(Box)(({ theme }) => ({
  width: 48,
  display: 'flex',
  justifyContent: 'center',
  marginLeft: theme.spacing(1.5),
}));

const CoinsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: 'transparent',
  borderRadius: 14,
  padding: '2px 10px 2px 6px',
  marginLeft: theme.spacing(1.5),
  height: 32,
  minWidth: 60,
}));

const CoinIconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginRight: 8,
});

const CoinsValue = styled('span')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: 1,
}));

const UserBox = styled(Box)(({ theme }) => ({
  width: 48,
  display: 'flex',
  justifyContent: 'center',
  marginLeft: theme.spacing(1.5),
}));
