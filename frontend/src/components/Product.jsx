import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import {
  useGetWishlistQuery,
  useAddWishlistMutation,
  useRemoveWishlistMutation,
} from '../slices/usersApiSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  
  const { data: wishlistItems, refetch } = useGetWishlistQuery(undefined, {
    skip: !userInfo,
  });

  const [addWishlist] = useAddWishlistMutation();
  const [removeWishlist] = useRemoveWishlistMutation();

  const isLiked = wishlistItems?.some((item) => item._id === product._id);

  const toggleWishlistHandler = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    try {
      if (isLiked) {
        await removeWishlist(product._id).unwrap();
      } else {
        await addWishlist(product._id).unwrap();
      }
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  return (
    <Card className='my-3 rounded'>
      <div className='card-img-container'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} />
        </Link>
        <div className="badge-bestseller">Best Seller</div>
        
        {/* Wishlist Button */}
        <div 
          onClick={toggleWishlistHandler}
          style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px', 
            cursor: 'pointer',
            background: 'white',
            borderRadius: '50%',
            padding: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {isLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
        </div>
      </div>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className='card-title'>
            {product.name}
          </Card.Title>
        </Link>
        
        <div className='card-text-muted'>
          {product.category}
        </div>

        <div className='mb-2'>
          <Rating
            value={product.rating}
            text={``} 
          />
        </div>

        <div className='price-container'>
          <span className='price-current'>${product.price}</span>
          <span className='price-original'>${(product.price * 1.2).toFixed(2)}</span>
        </div>

        <div className='variant-pills'>
          <div className='variant-pill active'>Standard</div>
          <div className='variant-pill'>Large</div>
        </div>

        <Button 
          className='btn-add-to-cart' 
          disabled={product.countInStock === 0}
          onClick={addToCartHandler}
        >
          {product.countInStock === 0 ? 'Out of Stock' : 'Add to cart'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
