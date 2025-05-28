import { selectUser } from '@shared/auth/authSlice';
import { keycloak } from '@shared/auth/config/keycloak';
import { useLanguage } from '@shared/i18n/hooks/useLanguage';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Menu as MenuIcon } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, styled } from '@mui/material';

export const TopBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Spacer />
        <LanguageSwitcher>
          <LanguageButton isActive={currentLanguage === 'ru'} onClick={() => changeLanguage('ru')}>
            RU
          </LanguageButton>
          <LanguageButton isActive={currentLanguage === 'en'} onClick={() => changeLanguage('en')}>
            EN
          </LanguageButton>
        </LanguageSwitcher>
        <SettingsContainer>
          <IconButton color="inherit" onClick={() => navigate('/settings')}>
            <SettingsIcon />
          </IconButton>
        </SettingsContainer>
        <UserContainer>
          {user ? (
            <Tooltip title={user.username}>
              <UserAvatar>
                <Avatar alt={user.username} src={user.avatar || ''} />
              </UserAvatar>
            </Tooltip>
          ) : (
            <LoginButton color="inherit" onClick={() => keycloak.login()}>
              {t('nav.login')}
            </LoginButton>
          )}
        </UserContainer>
      </Toolbar>
    </StyledAppBar>
  );
};

// Styles
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Spacer = styled(Box)({
  flexGrow: 1,
});

const LanguageSwitcher = styled(Box)(({ theme }) => ({
  width: 88,
  display: 'flex',
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

const LanguageButton = styled('button', {
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
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SettingsContainer = styled(Box)({
  width: 48,
  display: 'flex',
  justifyContent: 'center',
  marginLeft: 24,
});

const UserContainer = styled(Box)({
  width: 64,
  display: 'flex',
  justifyContent: 'center',
  marginLeft: 24,
});

const UserAvatar = styled(IconButton)({
  padding: 0,
});

const LoginButton = styled(IconButton)({
  minWidth: 64,
});
