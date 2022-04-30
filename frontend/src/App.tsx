import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavigationBar } from './components/NavigationBar';
import { BannerPage } from './pages/BannerPage';
import { CategoryPage } from './pages/CategoryPage';
function App() {
  return (
    <Router>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path='/' element="HomePage"></Route>
        <Route path='/banners' element={<BannerPage/>}></Route>
        <Route path='/categories'  element={<CategoryPage/>}></Route>
        <Route path='*' element="PageNotFound"></Route>
      </Routes>
    </Router>
  );
}

export default App;
