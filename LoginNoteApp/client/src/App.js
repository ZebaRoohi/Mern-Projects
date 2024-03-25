
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Note from './components/Note';
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegistrationForm  setLoggedIn={setIsLoggedIn}/>} />
          <Route path='/login' element={<LoginForm handleLogin={() => setIsLoggedIn(true)} />} />
          <Route path='/notes' element={<Note isLoggedIn={isLoggedIn}/>} />
          <Route path='/create' element={<CreateNote />} />
          <Route path='edit/:id' element={<UpdateNote />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
