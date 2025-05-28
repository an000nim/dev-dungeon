import { keycloak } from '@shared/auth/config/keycloak';

import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import StoreIcon from '@mui/icons-material/Store';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useMediaQuery,
} from '@mui/material';

const pages = [
  { path: '/', titleKey: 'nav.home', icon: HomeIcon },
  { path: '/profile', titleKey: 'nav.profile', icon: PersonIcon },
  { path: '/onboarding', titleKey: 'nav.onboarding', icon: AssignmentIcon },
  { path: '/teams', titleKey: 'nav.teams', icon: GroupIcon },
  { path: '/skills', titleKey: 'nav.skills', icon: SchoolIcon },
  { path: '/quests', titleKey: 'nav.quests', icon: ListAltIcon },
  { path: '/store', titleKey: 'nav.store', icon: StoreIcon },
];

export const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isCompact = useMediaQuery('(max-width:900px)');

  return (
    <SidebarContainer isCompact={isCompact}>
      <LogoContainer isCompact={isCompact}>
        <LogoIcon>
          <AssignmentIcon sx={{ color: '#fff', fontSize: 28 }} />
        </LogoIcon>
        {!isCompact && <LogoText>DevDungeon</LogoText>}
      </LogoContainer>
      <Divider />
      <NavList isCompact={isCompact}>
        {pages.map((page) => (
          <NavItem
            key={page.path}
            onClick={() => navigate(page.path)}
            selected={location.pathname === page.path}
            isCompact={isCompact}
          >
            <NavIcon isCompact={isCompact}>
              <page.icon />
            </NavIcon>
            {!isCompact && <ListItemText primary={t(page.titleKey)} />}
          </NavItem>
        ))}
      </NavList>
      <LogoutContainer isCompact={isCompact}>
        <LogoutButton
          onClick={() => keycloak.logout({ redirectUri: window.location.origin + '/' })}
          isCompact={isCompact}
        >
          <LogoutIconWrapper isCompact={isCompact}>
            <LogoutIcon />
          </LogoutIconWrapper>
          {!isCompact && <ListItemText primary={t('nav.logout') || 'Выход'} />}
        </LogoutButton>
      </LogoutContainer>
    </SidebarContainer>
  );
};

// Styles
const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ theme, isCompact }) => ({
  width: isCompact ? 72 : 240,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: isCompact ? 'center' : 'stretch',
}));

const LogoContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ isCompact }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: isCompact ? 0 : 24,
  paddingTop: 24,
  paddingBottom: 16,
  marginBottom: 8,
  justifyContent: isCompact ? 'center' : 'flex-start',
}));

const LogoIcon = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: '#9C27FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 8,
});

const LogoText = styled(Box)({
  fontWeight: 700,
  fontSize: 20,
  color: '#B388FF',
  letterSpacing: 0.5,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif",
});

const Divider = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: 8,
  width: '100%',
}));

const NavList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ isCompact }) => ({
  marginTop: 8,
  flexGrow: 1,
  alignItems: isCompact ? 'center' : 'stretch',
}));

const NavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isCompact' && prop !== 'selected',
})<{ isCompact: boolean; selected?: boolean }>(({ theme, isCompact, selected }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '& .MuiListItemIcon-root': { color: '#fff' },
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  marginBottom: 8,
  borderRadius: 8,
  justifyContent: isCompact ? 'center' : 'flex-start',
  paddingLeft: isCompact ? 0 : 16,
  paddingRight: isCompact ? 0 : 16,
  width: isCompact ? 56 : 'auto',
}));

const NavIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ isCompact }) => ({
  color: 'inherit',
  minWidth: 0,
  justifyContent: 'center',
  marginRight: isCompact ? 0 : 16,
}));

const LogoutContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ isCompact }) => ({
  marginTop: 'auto',
  marginBottom: 16,
  paddingLeft: isCompact ? 0 : 16,
  paddingRight: isCompact ? 0 : 16,
  width: '100%',
}));

const LogoutButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ theme, isCompact }) => ({
  color: theme.palette.text.secondary,
  borderRadius: 8,
  opacity: 0.6,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    opacity: 1,
  },
  justifyContent: isCompact ? 'center' : 'flex-start',
  paddingLeft: isCompact ? 0 : 16,
  paddingRight: isCompact ? 0 : 16,
  width: isCompact ? 56 : 'auto',
}));

const LogoutIconWrapper = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ theme, isCompact }) => ({
  color: theme.palette.text.secondary,
  minWidth: 0,
  justifyContent: 'center',
  marginRight: isCompact ? 0 : 16,
}));
