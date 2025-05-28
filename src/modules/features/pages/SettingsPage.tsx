import { useAppDispatch } from '@shared/reduxTools/reduxHooks';
import { toggleTheme } from '@shared/theme/themeSlice';

import { Box, Card, CardContent, Typography, styled } from '@mui/material';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();

  return (
    <RootBox>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
          <Box>
            <Typography variant="body1">Theme</Typography>
            <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
          </Box>
        </CardContent>
      </Card>
    </RootBox>
  );
};

// Styles
const RootBox = styled(Box)({
  padding: 24,
});
