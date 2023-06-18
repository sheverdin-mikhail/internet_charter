
import {Routes, Route} from 'react-router-dom'
import './styles/index.css'
import { Layout } from '../widgets/Layout/Layout';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ParentPage } from '../pages/ParentPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ProgressPage } from '../pages/ProgressPage';
import { TeacherPage } from '../pages/TeacherPage';
import { TestingPage } from 'pages/TestingPage';
import { AccountPage } from 'pages/AccountPage';
import { AccountTestsPage } from 'pages/AccountTestsPage';
import { AccountMyTestsPage } from 'pages/AccountMyTestsPage';
import { CreateTestPage } from 'pages/CreateTestPage';
import { ResultsPage } from 'pages/ResultsPage';
import { Popups } from 'entities/Popups';
import { TestsPage } from 'pages/TestsPage/TestsPage';
import { StagePage } from 'pages/StagePage/StagePage';

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route path='/' element={<HomePage/>} />
              <Route path='/progress' element={<ProgressPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/account' element={<AccountPage />} />
              <Route path='/account/results' element={<ResultsPage />} />
              <Route path='/account/tests' element={<AccountTestsPage />} />
              <Route path='/account/my-tests' element={<AccountMyTestsPage />} />
              <Route path='/account/create-test' element={<CreateTestPage />} />
              <Route path='/tests' element={<TestsPage />} />
              <Route path='/stage' element={<StagePage />} />
              <Route path='/for-parents' element={<ParentPage />} />
              <Route path='/for-teachers' element={<TeacherPage />} />
              <Route path='/testing' element={<TestingPage />} />
              <Route path='*' element={<NotFoundPage />} />
          </Route>
      </Routes>
      
      <Popups />

    </div>
  );
}

export default App;
