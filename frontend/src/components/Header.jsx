import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaRegUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';

import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <div className="top-banner">
        Upto 33% OFF + Freebies
      </div>
      <Navbar bg='white' variant='light' expand='lg' collapseOnSelect className='shadow-sm'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Elyon
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mx-auto d-none d-lg-flex'>
              <Nav.Link as={Link} to='/'>Shop</Nav.Link>
              <Nav.Link as={Link} to='/'>Best Sellers</Nav.Link>
              <Nav.Link as={Link} to='/'>Skin & Body Care</Nav.Link>
            </Nav>
            <Nav className='ms-auto align-items-center'>
              <SearchBox />
              <Nav.Link as={Link} to='/cart' style={{ position: 'relative' }}>
                <FaShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <Badge pill bg='dark' style={{ position: 'absolute', top: '-5px', right: '-10px', fontSize: '0.6rem' }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <>
                  <NavDropdown title={<FaRegUser size={20} />} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/wishlist'>
                      Wishlist
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaRegUser size={20} />
                </Nav.Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/dashboard'>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/productlist'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/userlist'>
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
