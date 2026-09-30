import { Row, Col, Card } from 'react-bootstrap';
import { useGetAnalyticsQuery } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaMoneyBillWave, FaBox, FaUsers, FaShoppingCart } from 'react-icons/fa';

const AdminDashboard = () => {
  const { data, isLoading, error } = useGetAnalyticsQuery();

  return (
    <>
      <h1>Admin Dashboard</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row className='mt-4'>
          <Col md={3}>
            <Card className='text-center p-3 mb-4 shadow-sm'>
              <Card.Body>
                <FaMoneyBillWave size={40} className='mb-3' style={{ color: 'var(--color-secondary)' }} />
                <Card.Title>Total Sales</Card.Title>
                <Card.Text as='h2'>${data.totalSales.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='text-center p-3 mb-4 shadow-sm'>
              <Card.Body>
                <FaShoppingCart size={40} className='mb-3' style={{ color: 'var(--color-secondary)' }} />
                <Card.Title>Total Orders</Card.Title>
                <Card.Text as='h2'>{data.totalOrders}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='text-center p-3 mb-4 shadow-sm'>
              <Card.Body>
                <FaUsers size={40} className='mb-3' style={{ color: 'var(--color-secondary)' }} />
                <Card.Title>Total Users</Card.Title>
                <Card.Text as='h2'>{data.totalUsers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='text-center p-3 mb-4 shadow-sm'>
              <Card.Body>
                <FaBox size={40} className='mb-3' style={{ color: 'var(--color-secondary)' }} />
                <Card.Title>Total Products</Card.Title>
                <Card.Text as='h2'>{data.totalProducts}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdminDashboard;
