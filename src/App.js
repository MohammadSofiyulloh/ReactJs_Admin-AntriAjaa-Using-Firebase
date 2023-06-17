import Home from './pages/home/Home';
import Login from './pages/login/Login';
import ListDoctor from './pages/ListDoctor/ListDoctor';
import NewDataDoctor from './pages/newDataDoctor/NewDataDoctor';
import NewDataNews from './pages/newDataEvents/NewDataEvents';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { userInputs, userInputsNews } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import ListEvents from './pages/ListEvents/ListEvents';


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="doctorPage">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListDoctor />
                  </RequireAuth>
                }
              />
              <Route
                path="newDataDoctor"
                element={
                  <RequireAuth>
                    <NewDataDoctor inputs={userInputs} title="Add New Doctor" />
                  </RequireAuth>
                }
              />
            </Route>
            {/* <Route path="hospitalPage">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
            </Route> */}
            <Route path="eventsPage">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListEvents />
                  </RequireAuth>
                }
              />
              <Route
                path="newDataEvents"
                element={
                  <RequireAuth>
                    <NewDataNews inputs={userInputsNews} title="Add New Events" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
