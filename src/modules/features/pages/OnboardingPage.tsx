import { useAppSelector } from '@shared/reduxTools/reduxHooks';

import { useTranslation } from 'react-i18next';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box, Paper, styled } from '@mui/material';

export const OnboardingPage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);

  // Статичный чеклист (можно сделать динамическим позже)
  const steps = [
    t('onboarding.step.profile'),
    t('onboarding.step.team'),
    t('onboarding.step.quest'),
    t('onboarding.step.achievements'),
    t('onboarding.step.settings'),
  ];
  const doneSteps = 1; // Для примера: только первый шаг выполнен

  return (
    <RootBox>
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          {t('onboarding.welcome', { name: user?.username || '' })}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {t('onboarding.intro')}
        </Typography>
        <List>
          {steps.map((step, idx) => (
            <ListItem key={step}>
              <ListItemIcon>
                {idx < doneSteps ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <RadioButtonUncheckedIcon color="disabled" />
                )}
              </ListItemIcon>
              <ListItemText primary={step} />
            </ListItem>
          ))}
        </List>
        <ProgressBox>
          <LinearProgress
            variant="determinate"
            value={(doneSteps / steps.length) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
            {t('onboarding.progress', { done: doneSteps, total: steps.length })}
          </Typography>
        </ProgressBox>
        <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
          {t('onboarding.reward')}
        </Typography>
        <Button variant="outlined" color="secondary">
          {t('onboarding.skip')}
        </Button>
      </StyledPaper>
    </RootBox>
  );
};

// ===== Стили внизу файла =====
const RootBox = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(8),
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 4,
  boxShadow: theme.shadows[3],
}));

const ProgressBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
