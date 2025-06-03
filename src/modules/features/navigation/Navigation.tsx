import type { User } from '@features/user/types';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import React, { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const DrawerBox = styled(Box)({ textAlign: 'center' });
const NavButtonsBox = styled(Box)({ flexGrow: 1, display: 'flex', gap: 8 });
const UserBox = styled(Box)({ display: 'flex', alignItems: 'center', gap: 8 });

const pages = [
  { path: '/', titleKey: 'nav.home', icon: HomeIcon },
  { path: '/profile', titleKey: 'nav.profile', icon: PersonIcon },
  { path: '/settings', titleKey: 'nav.settings', icon: SettingsIcon },
];

export const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user) as User | null;
  const { t } = useTranslation();

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
      setMobileOpen(false);
    },
    [navigate]
  );

  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const drawer = (
    <DrawerBox onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {pages.map((page) => (
          <ListItemButton
            key={page.path}
            onClick={() => handleNavigation(page.path)}
            selected={location.pathname === page.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected,
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <page.icon />
            </ListItemIcon>
            <ListItemText primary={t(page.titleKey)} />
          </ListItemButton>
        ))}
      </List>
    </DrawerBox>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {!isMobile && (
              <NavButtonsBox>
                {pages.map((page) => (
                  <Button
                    key={page.path}
                    onClick={() => handleNavigation(page.path)}
                    sx={{
                      color: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      backgroundColor:
                        location.pathname === page.path
                          ? theme.palette.action.selected
                          : 'transparent',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <page.icon />
                    {t(page.titleKey)}
                  </Button>
                ))}
              </NavButtonsBox>
            )}

            <UserBox>
              {user ? (
                <>
                  <Tooltip title={t('nav.logout')}>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <Avatar alt={user.username} src={user.avatar} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: '45px',
                      '& .MuiPaper-root': {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                      },
                    }}
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
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <Typography textAlign="center">{t('nav.logout')}</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => handleNavigation('/login')}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {t('nav.login')}
                </Button>
              )}
            </UserBox>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation;
