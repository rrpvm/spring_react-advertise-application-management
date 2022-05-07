import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './components/AdminLayout';
import { PageNotFound } from './pages/PageNotFound';
import { HomePage } from './pages/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin/*' element={
          <AdminLayout></AdminLayout>
        }>        
        </Route>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/home' element={<HomePage></HomePage>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
