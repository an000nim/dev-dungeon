import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import StoreIcon from '@mui/icons-material/Store';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootBox = styled(Box)(({ theme }) => ({
  width: 240,
  height: '100vh',
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const HeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 24,
  paddingTop: 24,
  paddingBottom: 16,
  marginBottom: 8,
});

const LogoBox = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: '#9C27FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 8,
});

const TitleBox = styled(Box)({
  fontWeight: 700,
  fontSize: 20,
  color: '#B388FF',
  letterSpacing: 0.5,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif",
});

const DividerBox = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: 8,
}));

const pages = [
  { path: '/', titleKey: 'nav.home', icon: HomeIcon },
  { path: '/profile', titleKey: 'nav.profile', icon: PersonIcon },
  { path: '/onboarding', titleKey: 'nav.onboarding', icon: AssignmentIcon },
  { path: '/teams', titleKey: 'nav.teams', icon: GroupIcon },
  { path: '/skills', titleKey: 'nav.skills', icon: SchoolIcon },
  { path: '/quests', titleKey: 'nav.quests', icon: ListAltIcon },
  { path: '/store', titleKey: 'nav.store', icon: StoreIcon },
];

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <RootBox>
      <HeaderBox>
        <LogoBox>
          <AssignmentIcon sx={{ color: '#fff', fontSize: 28 }} />
        </LogoBox>
        <TitleBox>DevDungeon</TitleBox>
      </HeaderBox>
      <DividerBox />
      <List sx={{ mt: 1 }}>
        {pages.map((page) => (
          <ListItemButton
            key={page.path}
            onClick={() => handleNavigate(page.path)}
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
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <page.icon />
            </ListItemIcon>
            <ListItemText primary={t(page.titleKey)} />
          </ListItemButton>
        ))}
      </List>
    </RootBox>
  );
};

export default Sidebar;
