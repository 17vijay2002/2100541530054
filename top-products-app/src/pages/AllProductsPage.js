import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const API_BASE_URL = 'http://localhost:3000';

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    priceRange: [0, 1000],
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { category, company, priceRange } = filters;
        const response = await axios.get(`${API_BASE_URL}/${company || ''}/categories/${category || ''}/products`, {
          params: {
            top: 10, // Set a default value for 'top'
            minPrice: priceRange[0] || 0, // Default to 0 if priceRange[0] is undefined
            maxPrice: priceRange[1] || 1000, // Default to 1000 if priceRange[1] is undefined
            page,
          },
        });
        console.log('API Response:', response.data); // Log the response
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages || 1); // Example field for total pages
        } else {
          console.error('Unexpected data format:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [filters, page]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Products</Typography>
      <Grid container spacing={3} alignItems="center" marginBottom={3}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Select
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              {companies.map(company => (
                <MenuItem key={company} value={company}>{company}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Min Price"
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => setFilters({ ...filters, priceRange: [parseFloat(e.target.value) || 0, filters.priceRange[1]] })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Max Price"
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseFloat(e.target.value) || 1000] })}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {products && products.length > 0 ? (
          products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">Company: {product.company}</Typography>
                  <Typography variant="body1">Price: ${product.price}</Typography>
                  <Typography variant="body1">Rating: {product.rating}</Typography>
                  <Typography variant="body1">Discount: {product.discount}%</Typography>
                  <Typography variant="body1">Available: {product.availability ? 'In Stock' : 'Out of Stock'}</Typography>
                  <StyledLink to={`/product/${product.id}`}>View Details</StyledLink>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography>No products available</Typography>
        )}
      </Grid>
      <Grid container spacing={2} justifyContent="center" marginTop={3}>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            style={{ marginRight: '10px' }} // Add margin-right to space buttons
          >
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllProductsPage;
