import { Form, Button, Accordion } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const submitHandler = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (rating) params.append('rating', rating);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    navigate(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setCategory('');
    setRating('');
    setMinPrice('');
    setMaxPrice('');
    navigate('/');
  };

  return (
    <div className='filter-sidebar p-3 mb-4' style={{ backgroundColor: 'var(--color-accent)', borderRadius: 'var(--border-radius)' }}>
      <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Filters</h4>
      <Form onSubmit={submitHandler}>
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0" style={{ backgroundColor: 'transparent', border: 'none' }}>
            <Accordion.Header style={{ backgroundColor: 'transparent' }}>Category</Accordion.Header>
            <Accordion.Body>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value=''>All Categories</option>
                <option value='Electronics'>Electronics</option>
                <option value='Cameras'>Cameras</option>
                <option value='Accessories'>Accessories</option>
              </Form.Select>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1" style={{ backgroundColor: 'transparent', border: 'none' }}>
            <Accordion.Header>Price Range</Accordion.Header>
            <Accordion.Body>
              <Form.Group className='mb-2'>
                <Form.Label>Min Price ($)</Form.Label>
                <Form.Control type='number' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Max Price ($)</Form.Label>
                <Form.Control type='number' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" style={{ backgroundColor: 'transparent', border: 'none' }}>
            <Accordion.Header>Minimum Rating</Accordion.Header>
            <Accordion.Body>
              <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value=''>Any Rating</option>
                <option value='4'>4+ Stars</option>
                <option value='3'>3+ Stars</option>
                <option value='2'>2+ Stars</option>
              </Form.Select>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        
        <div className="d-grid gap-2 mt-3">
          <Button type='submit' variant='primary'>Apply Filters</Button>
          <Button type='button' variant='outline-secondary' onClick={clearFilters}>Clear</Button>
        </div>
      </Form>
    </div>
  );
};

export default FilterSidebar;
