import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navebar from './Navebar';
import Home from './Components/Home';
import DataList from './Components/DataList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navebar />}>
            <Route index element={<Home />} />
            <Route path='/data/:name' element={<DataList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
