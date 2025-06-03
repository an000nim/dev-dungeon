import type { User } from '@features/user/types';
import { useLanguage } from '@shared/i18n';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const TopBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const user = useAppSelector((state) => state.auth.user) as User | null;
  const theme = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <GrowBox />
        <LangBox>
          <LangBtn
            as="button"
            active={currentLanguage === 'ru'}
            onClick={() => changeLanguage('ru')}
          >
            RU
          </LangBtn>
          <LangBtn
            as="button"
            active={currentLanguage === 'en'}
            onClick={() => changeLanguage('en')}
          >
            EN
          </LangBtn>
        </LangBox>
        <IconBox>
          <IconButton color="inherit" onClick={() => handleNavigate('/settings')}>
            <SettingsIcon />
          </IconButton>
        </IconBox>
        <UserBox>
          {user ? (
            <>
              <Tooltip title={user.username}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.username} src={user.avatar || ''} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => handleNavigate('/profile')}>
                  <Typography textAlign="center">{t('nav.profile')}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/settings')}>
                  <Typography textAlign="center">{t('nav.settings')}</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              color="inherit"
              onClick={() => handleNavigate('/login')}
              sx={{ minWidth: 64 }}
            >
              {t('nav.login')}
            </IconButton>
          )}
        </UserBox>
      </Toolbar>
    </AppBar>
  );
};

const GrowBox = styled(Box)({ flexGrow: 1 });
const LangBox = styled(Box)(({ theme }) => ({
  width: 88,
  display: 'flex',
  borderRadius: 8,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));
const LangBtn = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  width: 44,
  textAlign: 'center',
  fontWeight: 700,
  fontSize: 14,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': { backgroundColor: theme.palette.action.hover },
}));
const IconBox = styled(Box)({
  width: 48,
  display: 'flex',
  justifyContent: 'center',
  marginLeft: 24,
});
const UserBox = styled(Box)({
  width: 64,
  display: 'flex',
  justifyContent: 'center',
  marginLeft: 24,
});

export default TopBar;
