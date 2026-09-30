import { Row, Col } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import FilterSidebar from '../components/FilterSidebar';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [searchParams] = useSearchParams();
  
  const category = searchParams.get('category');
  const rating = searchParams.get('rating');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    category,
    rating,
    minPrice,
    maxPrice,
  });

  return (
    <>
      {!keyword && !category && !rating && !minPrice && !maxPrice ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h2 className='mt-4 mb-4' style={{ fontWeight: 600, fontSize: '2rem' }}>Our Best Sellers</h2>
          <Row>
            <Col md={3}>
              <FilterSidebar />
            </Col>
            <Col md={9}>
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
