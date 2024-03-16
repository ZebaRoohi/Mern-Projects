
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Note from './components/Note';
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Note />} />
          <Route path='/create' element={<CreateNote />} />
          <Route path='edit/:id' element={<UpdateNote />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
