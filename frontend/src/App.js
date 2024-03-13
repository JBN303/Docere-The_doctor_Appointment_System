import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Interface from "./components/Interface";
import Login from "./components/Doctor/Login";
import SignUp from "./components/Doctor/SignUp";
import DoctorPage from './components/Doctor/DoctorPage';
import Interfac from './components/Admin/Interfac'
import AdminLogin from "./components/Admin/AdminLogin";
import Psignup from "./components/Patient/Psignup";
import Plogin from "./components/Patient/Plogin";
import DoctorList from './components/Admin/DoctorList';
import Demo from "./components/Demo";
import PatientView from "./components/Admin/PatientView";
import PatientProfile from "./components/Patient/PatientProfile";
import Psidebar from "./components/Patient/Psidebar";
import SpecializationTabs from "./components/Patient/Specialization";
import Nearby from "./components/Patient/Nearby";
import EditProfile from "./components/Doctor/EditProfile";
import MyAppointments from "./components/Patient/MyAppointments";
import Loading from "./components/Doctor/Loading";
import AdminDash from "./components/Admin/AdminDash";
function App() {
  return (
    <div>
 <BrowserRouter>
    <Routes>

      <Route path='/' element={<Interface/>}></Route>
      <Route path="/load" element={<Loading/>}/>

      //doctor
      <Route path='/register' element={<SignUp />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path="/doctor/:userId" element={<DoctorPage />} />
      <Route path="/edit/:userId" element={<EditProfile/>} />

     //patient
      <Route path='/patient register' element={<Psignup />}></Route>
      <Route path='/patient login' element={<Plogin/>}></Route>
      <Route path="/psidebar/:id" element={<Psidebar/>}/>
      <Route path='/patient/:id' element={<PatientProfile />} />
      <Route path="/spec/:id" element={<SpecializationTabs/>}/>
      <Route path="/near/:id" element={<Nearby/>}/>
      <Route path="/myapp/:id" element={<MyAppointments/>}/>
      
      //admin
      <Route path='/admin' element={<AdminLogin />}></Route>
      <Route path='/admindashboard' element={<Interfac/>}></Route>
     <Route path="/dash" element={<AdminDash/>}></Route>
      <Route path='/pview' element={<PatientView/>}></Route>
      <Route path='/doctorview' element={<DoctorList />}></Route>
    </Routes> 
    </BrowserRouter>
    
    </div>
  );
}

export default App;
