import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './BookCard';

// ----------------------------------------------------------------------

BookList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default function BookList({ books, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {books.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
