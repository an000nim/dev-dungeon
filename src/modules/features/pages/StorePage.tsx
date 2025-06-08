import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Примерные данные (заменить на реальные из API)
const mockBalance = 2450;
const mockItems = [
  {
    id: 1,
    name: 'XP Boost',
    price: 500,
    category: 'boosts',
    icon: <EmojiEventsIcon color="warning" />,
  },
  {
    id: 2,
    name: 'Cool Avatar',
    price: 1200,
    category: 'avatars',
    icon: <Avatar src="" />,
  },
  {
    id: 3,
    name: 'Champion Badge',
    price: 800,
    category: 'badges',
    icon: <EmojiEventsIcon color="primary" />,
  },
];

export const StorePage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const balance = mockBalance; // заменить на реальные данные
  const items = mockItems.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RootBox>
      <HeaderBox>
        <Typography variant="h4">{t('store.title')}</Typography>
        <Chip
          icon={<ShoppingCartIcon />}
          label={`${t('store.balance')}: ${balance} ${t('quests.coins')}`}
          color="primary"
          sx={{ fontSize: 16, height: 36 }}
        />
      </HeaderBox>
      <FiltersBox>
        <TextField
          size="small"
          placeholder={t('store.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>{t('store.category')}</InputLabel>
          <Select
            value={category}
            label={t('store.category')}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">{t('store.allItems')}</MenuItem>
            <MenuItem value="boosts">Boosts</MenuItem>
            <MenuItem value="avatars">Avatars</MenuItem>
            <MenuItem value="badges">Badges</MenuItem>
          </Select>
        </FormControl>
      </FiltersBox>
      {items.length === 0 ? (
        <StyledPaper>
          <Typography variant="h6" color="text.secondary">
            {t('store.noItems')}
          </Typography>
        </StyledPaper>
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
              <StyledCard>
                <CardContent>
                  <ItemHeaderBox>
                    <Avatar sx={{ mr: 2, bgcolor: 'background.paper' }}>{item.icon}</Avatar>
                    <Typography variant="h6">{item.name}</Typography>
                  </ItemHeaderBox>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {t('store.price')}: {item.price} {t('quests.coins')}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    {t('store.buy')}
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </RootBox>
  );
};

// ===== Стили внизу файла =====
const RootBox = styled(Box)(({ theme }) => ({
  maxWidth: 1000,
  margin: '0 auto',
  marginTop: theme.spacing(6),
  padding: theme.spacing(2),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

const FiltersBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 4,
  boxShadow: theme.shadows[3],
}));

const ItemHeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));
