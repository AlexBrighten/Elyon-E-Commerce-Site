import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetWishlistQuery,
  useRemoveWishlistMutation,
} from '../slices/usersApiSlice';

const WishlistScreen = () => {
  const { data: wishlistItems, isLoading, error } = useGetWishlistQuery();
  const [removeWishlistItem, { isLoading: isRemoveLoading }] =
    useRemoveWishlistMutation();

  const removeFromWishlistHandler = async (id) => {
    try {
      await removeWishlistItem(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>My Wishlist</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : wishlistItems.length === 0 ? (
        <Message>
          Your wishlist is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              {wishlistItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromWishlistHandler(item._id)}
                        disabled={isRemoveLoading}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default WishlistScreen;
