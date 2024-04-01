import './App.css';
import HomePage from './pages/homePage/homePage';
import SearchPage from './pages/searchPage/searchPage';
import PlaceAdvertPage from './pages/createAdvertPage/createAdvertPage';
import SignInPage from './pages/signInPage/signInPage';
import DealersPage from './pages/dealersPage/dealersPage';
import ProfilePage from './pages/profilePage/profilePage';
import CreateAccountPage from './pages/createAccountPage/createAccountPage';
import ResultsPage from './pages/resultsPage/resultsPage';
import AdvertPage from './pages/advertPage/advertPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/placeadvert" element={<PlaceAdvertPage/>}></Route>
          <Route path="/dealers" element={<DealersPage/>}></Route>
          <Route path="/signin" element={<SignInPage/>}></Route>
          <Route path="/search" element={<SearchPage/>}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
          <Route path="/register" element={<CreateAccountPage/>}></Route>
          <Route path="/results" element={<ResultsPage/>}></Route>
          <Route path="/advertisement/:id" element={<AdvertPage/>}></Route>
          <Route path="*" element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
