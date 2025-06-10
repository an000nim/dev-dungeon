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

const RootBox = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  alignItems: 'stretch',
});

const MainContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  minHeight: 0,
}));

const ContentBox = styled(Box)({
  flexGrow: 1,
  padding: 12,
  minHeight: 0,
});
