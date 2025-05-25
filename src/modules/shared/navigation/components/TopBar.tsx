import React, { useState } from 'react';

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

import { useAppSelector } from '../../../../app/hooks';
import { useLanguage } from '../../../../app/hooks';
import type { User } from '../../../features/auth/types';

export const TopBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const user = useAppSelector((state) => state.auth.user) as User | null;
  const theme = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            width: 88,
            display: 'flex',
            borderRadius: 2,
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component="button"
            onClick={() => changeLanguage('ru')}
            sx={{
              width: 44,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 14,
              color:
                currentLanguage === 'ru' ? theme.palette.primary.main : theme.palette.text.primary,
              backgroundColor:
                currentLanguage === 'ru' ? theme.palette.action.selected : 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { backgroundColor: theme.palette.action.hover },
            }}
          >
            RU
          </Box>
          <Box
            component="button"
            onClick={() => changeLanguage('en')}
            sx={{
              width: 44,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 14,
              color:
                currentLanguage === 'en' ? theme.palette.primary.main : theme.palette.text.primary,
              backgroundColor:
                currentLanguage === 'en' ? theme.palette.action.selected : 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { backgroundColor: theme.palette.action.hover },
            }}
          >
            EN
          </Box>
        </Box>
        <Box sx={{ width: 48, display: 'flex', justifyContent: 'center', ml: 3 }}>
          <IconButton color="inherit" onClick={() => navigate('/settings')}>
            <SettingsIcon />
          </IconButton>
        </Box>
        <Box sx={{ width: 64, display: 'flex', justifyContent: 'center', ml: 3 }}>
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
                <MenuItem onClick={() => navigate('/profile')}>
                  <Typography textAlign="center">{t('nav.profile')}</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/settings')}>
                  <Typography textAlign="center">{t('nav.settings')}</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton color="inherit" onClick={() => navigate('/login')} sx={{ minWidth: 64 }}>
              {t('nav.login')}
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
