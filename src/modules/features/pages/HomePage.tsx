import { useTranslation } from 'react-i18next';

import { Box, Container, Paper as MuiPaper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <MarginTopBox>
        <StyledPaper sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('home.title')}
          </Typography>
          <Typography variant="body1">{t('home.welcome')}</Typography>
        </StyledPaper>
      </MarginTopBox>
    </Container>
  );
};

const MarginTopBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(MuiPaper)({});

export default HomePage;
