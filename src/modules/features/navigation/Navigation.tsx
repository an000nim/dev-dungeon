import { selectUser } from '@shared/auth/authSlice';
import { LanguageSwitcher } from '@shared/i18n/components/LanguageSwitcher';
import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useCallback, useState } from 'react';

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
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';

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
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
      if (isMobile) {
        setMobileOpen(false);
      }
    },
    [navigate, isMobile]
  );

  const drawer = (
    <DrawerContent onClick={handleDrawerToggle}>
      <List>
        {pages.map((page) => (
          <NavListItemButton
            key={page.path}
            onClick={() => handleNavigation(page.path)}
            selected={location.pathname === page.path}
          >
            <ListItemIcon>
              <page.icon />
            </ListItemIcon>
            <ListItemText primary={t(page.titleKey)} />
          </NavListItemButton>
        ))}
      </List>
    </DrawerContent>
  );

  return (
    <>
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <MenuButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </MenuButton>
            )}

            {!isMobile && (
              <NavButtonsContainer>
                {pages.map((page) => (
                  <NavButton
                    key={page.path}
                    onClick={() => handleNavigation(page.path)}
                    selected={location.pathname === page.path}
                  >
                    <page.icon />
                    {t(page.titleKey)}
                  </NavButton>
                ))}
              </NavButtonsContainer>
            )}

            <RightSection>
              <LanguageSwitcher />
              {user ? (
                <>
                  <Tooltip title={t('nav.logout')}>
                    <UserAvatarButton onClick={handleOpenUserMenu}>
                      <Avatar alt={user.username} src={user.avatar} />
                    </UserAvatarButton>
                  </Tooltip>
                  <UserMenu
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
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{t('nav.logout')}</Typography>
                    </MenuItem>
                  </UserMenu>
                </>
              ) : (
                <LoginButton onClick={() => handleNavigation('/login')}>
                  {t('nav.login')}
                </LoginButton>
              )}
            </RightSection>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <MobileDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </MobileDrawer>
    </>
  );
};

// Styles
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const MenuButton = styled(IconButton)({
  marginRight: 16,
});

const NavButtonsContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  gap: 16,
});

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  backgroundColor: selected ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const UserAvatarButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UserMenu = styled(Menu)(({ theme }) => ({
  marginTop: '45px',
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: 'inherit',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: 240,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

const DrawerContent = styled(Box)({
  textAlign: 'center',
});

const NavListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    color: 'inherit',
  },
}));

export default Navigation;
