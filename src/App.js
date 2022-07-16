import {BrowserRouter as Router , Routes ,Route  } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Pacient from './components/Pacient/Pacient';
import Asistenta from './components/Asistenta/Asistenta';
import {AlertProvider} from "./context/alert/AlertContext";
import ProfilPacient from './components/ProfilPacient/ProfilPacient';
import Asistatns from './components/ProfilPacientToAsistants/Asistants';
import ChatRoom from './components/ChatRoom/ChatRoom';
import ProfilAsistenta from './components/ProfilAsistenta/ProfilAsistanta';
import AsistentaReview from './components/AsistentaReview/AsistentaReview';
import PacientRequests from './components/PacientRequests/PacientRequests';
import PacientReviews from './components/PacientReviews/PacientReviews';
import PacientDocumentation from './components/PacientDocumentation/PacientDocumentation';
import Pacienti from  './components/Pacienti/Pacienti'
import PacientTratamentRecenzie from './components/PacientRecenzieTratament/PacientRecenzieTratament';
import CereriPacient from './components/CereriAsistenta/CereriPacient';
import TratamentPacient from './components/TratamentPacient/TratamentPacient';
import RecenziiAsistente from './components/RecenziiAsistenteTotal/RecenziiAsistente';
import './App.css';


function App() {
  return (
    
      <div className="App">
        <header className="App-header">
        <Router>
              <Routes>
                <Route path='/' element={<MainPage/>} ></Route>
                <Route path='/pacient' element={<Pacient/>} ></Route>
                <Route path='/asistenta' element={<Asistenta/>} ></Route>
                <Route path='/asistenta/myprofile/:idAsistenta' element={<ProfilAsistenta/>} ></Route>
                <Route path='/pacient/myprofile/:idPacient' element={<ProfilPacient/>}></Route>
                <Route path='/pacient/myprofile/:idPacient/medical_asistants' element={<Asistatns/>}></Route>
                <Route path='/pacient/myprofile/:idPacient/chat-room' element={<ChatRoom/>}></Route>
                <Route path='/pacient/myprofile/:idPacient/medical_asistants/:idAsistenta/asistant_review' element={<AsistentaReview/>}></Route>
                <Route path='/pacient/myprofile/:idPacient/medical_asistants/myreviews' element={<PacientReviews/>}></Route>
                <Route path='/pacient/myprofile/:idPacient/medical_asistants/myrequests' element={<PacientRequests/>}></Route>
                <Route path='/pacient/myprofile/:idPacient/pacient_documentation' element={<PacientDocumentation/>}></Route>
                <Route path='/pacient/myprofile/:idPacient/pacient_documentation/modifica-recenzie' element={<PacientTratamentRecenzie/>}></Route>
                <Route path='/asistenta/myprofile/:idAsistenta/chat-room' element={<ChatRoom/>}></Route>
                <Route path='/asistenta/myprofile/:idAsistenta/pacienti' element={<Pacienti/>}></Route>
                <Route path='/asistenta/myprofile/:idAsistenta/pacienti/cereri-asistenta/:idPacient' element={<CereriPacient/>}></Route>
                <Route path='/asistenta/myprofile/:idAsistenta/pacienti/tratament-pacient/:idPacient' element={<TratamentPacient/>}></Route>
                <Route path='/recenzii-asistente' element={<RecenziiAsistente/>}></Route>
              </Routes>
        </Router>
        </header>
      </div>
    
  );
}

export default App;
