import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Grid, Box, makeStyles, Typography } from '@material-ui/core';
import Item from './items/Item';
import { useSelector, useDispatch } from 'react-redux';
import { getTables } from '../redux/productSlice';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const GeneralScreen = ({
  message = `Безперечно, ліжко – предмет меблів, на якому людина проводить значну частину свого часу, на якому відпочиває та відновлюється щоночі. Спеціально для вас ми створили посібник з вибору ліжка та матраца, тепер ви будете знати на що потрібно звернути увагу у магазині, чи при онлайн замовленні. Комфортний нічний сон – запорука здоров'я та хорошого самопочуття. Якщо ви хочете купити ліжко, перегляньте асортимент в магазинах JYSK, онлайн та офлайн представлені ліжка різноманітних стилів. Можна, наприклад, вибрати в спальню модель, виконану в класичному стилі, або ліжко без узголів'я у більш сучасному, мінімалістському стилі. Приємний бонус - бильця можна придбати окремо. Тож, варто придбати якісні товари для сну! Покладіть матрац у гарне ліжко та створіть найкраще місце для відпочинку.`,
  products,
}) => {
  const classes = useStyles();

  const { lizka } = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  return products ? (
    <Grid container spacing={0} direction={'column'} alignItems={'center'}>
      <Grid container item spacing={1} className={classes.root}>
        <Typography align={'center'} variant={'subtitle1'} gutterBottom>
          {message}
        </Typography>
        <Grid container spacing={1}>
          {lizka.map((item) => (
            <Item
              image={item.image}
              desc={item.description}
              id={item._id}
              key={item._id}
            />
          ))}
        </Grid>
      </Grid>

      <Grid container item spacing={1} className={classes.root}>
        <Typography align={'center'} variant={'subtitle1'} gutterBottom>
          Найпопулярніші серед столів
        </Typography>
        <Grid container spacing={1}>
          <Item />
          <Item />
          <Item />
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid container xs justify='center' alignItems='center'>
      <CircularProgress size={80} />
    </Grid>
  );
};

export default GeneralScreen;
