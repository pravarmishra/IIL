import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoutes';

const FadeRoute = ({ component: Component, ...rest },  user,
    loggedIn,
    onUserChange,
    onAuthUserChanged,
    history) => {
  return (
    <Route {...rest} element={
      <div className="effectStyle" style={{ opacity: 1, transition: 'opacity 0.5s ease-in' }}>
         {/* {renderNavBarHeader(prop)} */}
                  <PrivateRoute  >
        <Component user={user} loggedIn={loggedIn} onAuthUserChanged={onAuthUserChanged} history={history} />
        
            </PrivateRoute>
      </div>
    } />
  );
};

export default FadeRoute
