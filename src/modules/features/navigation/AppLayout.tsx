import { Outlet } from 'react-router-dom';

import { Box, styled } from '@mui/material';

import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AppLayout = () => {
  return (
    <RootBox>
      <Sidebar />
      <MainContainer>
        <TopBar />
        <ContentBox component="main">
          <Outlet />
        </ContentBox>
      </MainContainer>
    </RootBox>
  );
};

// Styles
const RootBox = styled(Box)({
  display: 'flex',
});

const MainContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const ContentBox = styled(Box)({
  flexGrow: 1,
  padding: 24,
});
