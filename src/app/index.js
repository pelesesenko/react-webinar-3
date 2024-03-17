import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import ProtectedRoute from '../containers/protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuth: !!state.user.data,
    waitingUser: state.user.waiting,
  }));

  const store = useStore();
  useEffect(() => {
    store.actions.user.loadUser();
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'}
               element={
                 <ProtectedRoute waiting={select.waitingUser}
                                 condition={select.isAuth}
                                 redirectTo='/login'
                 >
                   <Profile/>
                 </ProtectedRoute>
               }
        />
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
