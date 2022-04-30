import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavigationBar } from './components/NavigationBar';
import { BannerPage } from './layouts/BannerPage';
function App() {
  return (
    <Router>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path='/' element="HomePage"></Route>
        <Route path='/banners' element={<BannerPage/>}></Route>
        <Route path='/categories'  element="HomePage"></Route>
        <Route path='*' element="PageNotFound"></Route>
      </Routes>
    </Router>
  );
}

export default App;
