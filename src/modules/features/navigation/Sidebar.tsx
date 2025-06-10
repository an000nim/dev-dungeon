import { keycloak } from '@shared/auth/config/keycloak';

import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import StoreIcon from '@mui/icons-material/Store';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box, styled } from '@mui/material';

const pages = [
  { path: '/', titleKey: 'nav.home', icon: HomeIcon },
  { path: '/profile', titleKey: 'nav.profile', icon: PersonIcon },
  { path: '/onboarding', titleKey: 'nav.onboarding', icon: AssignmentIcon },
  { path: '/achievements', titleKey: 'nav.achievements', icon: EmojiEventsIcon },
  { path: '/teams', titleKey: 'nav.teams', icon: GroupIcon },
  { path: '/skills', titleKey: 'nav.skills', icon: SchoolIcon },
  { path: '/quests', titleKey: 'nav.quests', icon: ListAltIcon },
  { path: '/store', titleKey: 'nav.store', icon: StoreIcon },
];

export const Sidebar = () => {
  const theme = useTheme();
  const isCompact = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <SidebarRoot isCompact={isCompact}>
      <SidebarHeader isCompact={isCompact}>
        <SidebarLogo isCompact={isCompact}>
          <AssignmentIcon sx={{ color: '#fff', fontSize: isCompact ? 32 : 28 }} />
        </SidebarLogo>
        {!isCompact && <SidebarTitle>DevDungeon</SidebarTitle>}
      </SidebarHeader>
      <SidebarDivider theme={theme} />
      <List sx={{ mt: 1, flexGrow: 1, alignItems: isCompact ? 'center' : 'stretch' }}>
        {pages.map((page) => (
          <ListItemButton
            key={page.path}
            onClick={() => navigate(page.path)}
            selected={location.pathname === page.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
                '& .MuiListItemIcon-root': { color: '#fff' },
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              mb: 1,
              borderRadius: 2,
              justifyContent: isCompact ? 'center' : 'flex-start',
              px: isCompact ? 0 : 2,
              width: isCompact ? 56 : 'auto',
              minHeight: isCompact ? 64 : 56,
              fontSize: isCompact ? 28 : 22,
            }}
          >
            <SidebarListItemIcon isCompact={isCompact}>
              <page.icon sx={{ fontSize: isCompact ? 32 : 28 }} />
            </SidebarListItemIcon>
            {!isCompact && <ListItemText primary={t(page.titleKey)} />}
          </ListItemButton>
        ))}
      </List>
      <SidebarBottom isCompact={isCompact}>
        <ListItemButton
          onClick={() => keycloak.logout({ redirectUri: window.location.origin + '/' })}
          sx={{
            color: theme.palette.text.secondary,
            borderRadius: 2,
            opacity: 0.6,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              opacity: 1,
            },
            px: isCompact ? 0 : 2,
            justifyContent: isCompact ? 'center' : 'flex-start',
            width: isCompact ? 56 : 'auto',
            minHeight: isCompact ? 64 : 56,
            fontSize: isCompact ? 28 : 22,
          }}
        >
          <SidebarListItemIcon isCompact={isCompact} logout>
            <LogoutIcon sx={{ fontSize: isCompact ? 32 : 28 }} />
          </SidebarListItemIcon>
          {!isCompact && <ListItemText primary={t('nav.logout') || 'Выход'} />}
        </ListItemButton>
      </SidebarBottom>
    </SidebarRoot>
  );
};

const SidebarRoot = styled(Box, {
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

const SidebarHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ isCompact, theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: isCompact ? 0 : theme.spacing(1.5),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  justifyContent: isCompact ? 'center' : 'flex-start',
}));

const SidebarLogo = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ isCompact }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: '#9C27FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: !isCompact ? 8 : 0,
}));

const SidebarTitle = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 20,
  color: '#B388FF',
  letterSpacing: 0.5,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif",
}));

const SidebarDivider = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(1),
  width: '100%',
}));

const SidebarListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isCompact' && prop !== 'logout',
})<{ isCompact: boolean; logout?: boolean }>(({ isCompact }) => ({
  color: 'inherit',
  minWidth: 0,
  justifyContent: 'center',
  marginRight: isCompact ? 0 : 16,
  fontSize: isCompact ? 32 : 28,
}));

const SidebarBottom = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCompact',
})<{ isCompact: boolean }>(({ isCompact, theme }) => ({
  marginTop: 'auto',
  marginBottom: theme.spacing(2),
  paddingLeft: isCompact ? 0 : theme.spacing(2),
  paddingRight: isCompact ? 0 : theme.spacing(2),
  width: '100%',
  display: 'flex',
  justifyContent: isCompact ? 'center' : 'flex-start',
}));
