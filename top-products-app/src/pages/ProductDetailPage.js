import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';

const API_URL = 'http://localhost:3000'; 

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log('Product Response:', response.data); 
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h6">Company: {product.company}</Typography>
          <Typography variant="h6">Category: {product.category}</Typography>
          <Typography variant="h6">Price: ${product.price}</Typography>
          <Typography variant="h6">Rating: {product.rating}</Typography>
          <Typography variant="h6">Discount: {product.discount}%</Typography>
          <Typography variant="h6">Available: {product.availability ? 'In Stock' : 'Out of Stock'}</Typography>
        </CardContent>
      </StyledCard>
      <Button variant="contained" color="primary" onClick={() => window.history.back()} style={{ marginTop: '20px' }}>
        Back to All Products
      </Button>
    </Container>
  );
};

export default ProductDetailPage;
