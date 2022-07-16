import React, { useState } from "react";
import Axios from "axios";
import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import ApiStack from "../../context/alert/ApiStack/ApiStack";
import { AlertProvider } from "../../context/alert/AlertContext";
import Alert from "../Layouts/Alert";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {toast,ToastContainer} from 'react-toastify';

function Asistenta(){

    const navigate = useNavigate();
    const [codAsistenta , setCodAsistenta] = useState('');
    const setAlert = useContext(AlertContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [vizibilitateDivTelefon , setVizibilitateDivTelefon] = useState(false);
    const [vizibilitateDivVerificareTelefon , setvizibilitateDivVerificareTelefon] = useState(false);
    const [numarDeTelefon , setNumarDeTelefon] = useState('');
    const [requestId , setRequestId] = useState('');
    const [otp , setOtp] = useState('');
    const [idAsistenta , setIdAsistenta] = useState('');
    const [numarDeTelefonAsistenta , setNumarDeTelefonAsistenta] = useState('');



    const urmatoareaPaginaPacient =()=>{
        if(codAsistenta.length === 9) {
            Axios.get('http://localhost:8080/asistant/get_asistant_by_cod/'+codAsistenta).then(response=>{
                console.log(response);
                if(response.data === ""){
                    setErrorMessage("Codul introdus nu este valid");
                
                }else {
                    setVizibilitateDivTelefon(true);
                    setIdAsistenta(response.data.id);
                    setNumarDeTelefonAsistenta(response.data.numarDeTelefon);
                    
                }
                
            })
            Axios.get("http://localhost:8080/asistant/get_asistant_by_id/86b70dba-1f39-4243-a209-f5ba983106e9").then(response1=>{
                console.log(response1.data);
                Axios.put("http://localhost:8080/asistant/update_asistant_state/86b70dba-1f39-4243-a209-f5ba983106e9").then(respons2=>{
                    console.log(response1.data);
                })
            })
        }else{
            toast.error("Introduceti un cod valid",{position:toast.POSITION.TOP_CENTER});
        }
        console.log(errorMessage);
        
    }

    const afisareEroare = () => {
        if(errorMessage!==null){
            return(
               {errorMessage}
            )
        }
    }

    const sendOtp = () => {
        if(numarDeTelefon === numarDeTelefonAsistenta){
            ApiStack.sendOtp(numarDeTelefon)
            
            .then((requestId)=>{
                setRequestId(requestId);
                console.log(requestId);
                console.log('Trimitere cu succes');
                setvizibilitateDivVerificareTelefon(false);
            })
            .catch((err)=>{
                console.log(numarDeTelefon);
                console.log(err);

            })
        }else {

            console.log('ceva');
            setvizibilitateDivVerificareTelefon(true);
            console.log(vizibilitateDivVerificareTelefon);
            setTimeout(()=>{
                setvizibilitateDivVerificareTelefon(false)
            },3000);
            
            
        }
        
       
    }

    const verifyOtp =()=>{
        ApiStack.verifyOtp(requestId,otp)
            .then((isVerified)=>{
                console.log(`${isVerified}`);
                navigate(`/asistenta/myprofile/${idAsistenta}`);
                // Axios.get("http://localhost:8080/asistant/update_asistant_state/"+idAsistenta).then(response=>{
                    
                // })
                
            })
            .catch((err)=>{
                console.log(requestId);
                console.log(err);
            })
    }

   

    


    return(
        // <AlertProvider>
        //     <div className="container_pacient">
        //         <label >Introduceti codul dumneavoastra</label>
                
        //         <input type='text' onChange={(e)=>{setCodAsistenta(e.target.value)}}></input>
                
        //         <Alert/>
        //         <button onClick={urmatoareaPaginaPacient} >Mai departe</button>
        //         {errorMessage && <div className="error"> {errorMessage} </div>}
        //         {vizibilitateDivTelefon &&  <div className="verificare-telefon-otp" >
        //             <h1 className="flex mb-2">Introduceti numarul dumneavoastra de telefon</h1>
        //             <input type="text" placeholder="Numarul de telefon" onChange={(e)=>{setNumarDeTelefon(e.target.value)}}></input>
        //             <button onClick={sendOtp}>Trimite cod de verificare</button>
        //             <input type="text" placeholder="Codul primit prin mesaj " onChange={(e)=>setOtp(e.target.value)}></input>
        //             <button onClick={verifyOtp}>Verificati codul</button>

        //         </div>}
        //         {vizibilitateDivVerificareTelefon && <div className="verificare-telefon">
        //             <p>Numarul de telefon introdus este incorect</p>
        //             </div>}
                
        //     </div>
        // </AlertProvider>

        <div className="main_container">
            <h1 className="header_light">Be Patient</h1>
            <h2 className="header_light">Conectare</h2>
            <div className="card">

                <div>
                    <label htmlFor="Cnp">Introduceti codul dumneavoastra</label>
                    <InputText
                        name="Cnp"
                        className="form-control my-3"
                        onChange={(e)=>{setCodAsistenta(e.target.value)}}
                    />
                    <div className="buton_in_flecs">
                        <Button className="buton_login" onClick={urmatoareaPaginaPacient}>Mai departe</Button>
                    </div>
                </div>
                {vizibilitateDivTelefon &&
                    <div>
                        <label htmlFor="Verificare_cnp">Introduceti numarul dumneavoastra de telefon</label>
                        <InputText
                            name="Verificare_cnp"
                            className="form-control my-3"
                            onChange={(e) => { setNumarDeTelefon(e.target.value) }}
                        />
                        <div className="buton_in_flecs">
                            <Button className="buton_login" onClick={sendOtp}>Trimite cod de verificare</Button>
                        </div>

                        <div>
                        <label htmlFor="Verificare_cod">Introduceti codul primit prin sms</label>
                        <InputText
                            name="Verificare_cod"
                            className="form-control my-3"
                            onChange={(e)=>setOtp(e.target.value)}
                        />
                        <div className="buton_in_flecs">
                            <Button className="buton_login" onClick={verifyOtp}>Verificati codul primit</Button>
                        </div>
                    </div>
                    </div>
                    }

            </div>
            <ToastContainer/>
        </div>

        
    )
}

export default Asistenta;