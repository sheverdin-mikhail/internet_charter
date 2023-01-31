import {Routes, Route} from 'react-router-dom'
import './assets/styles/index.css'
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { ParentPage } from './pages/ParentPage';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/for-parents' element={<ParentPage />} />
            <Route path='*' element={<HomePage/>} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
