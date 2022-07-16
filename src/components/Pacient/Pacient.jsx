import React, { useContext } from "react";
import './Pacient.css'
import { useNavigate } from "react-router-dom";
import { AlertProvider } from "../../context/alert/AlertContext"
import AlertContext from "../../context/alert/AlertContext";
import { useState, useEffect } from 'react';
import Alert from "../Layouts/Alert";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import ApiStack from "../../context/alert/ApiStack/ApiStack";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {toast,ToastContainer} from 'react-toastify';


function Pacient() {

    const navigate = useNavigate();
    const [cnpObtinut, obtineCnpPacient] = useState('');
    const setAlert = useContext(AlertContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [vizibilitateDivTelefon, setVizibilitateDivTelefon] = useState(false);
    const [vizibilitateDivVerificareTelefon, setvizibilitateDivVerificareTelefon] = useState(false);
    const [numarDeTelefon, setNumarDeTelefon] = useState('');
    const [requestId, setRequestId] = useState('');
    const [otp, setOtp] = useState('');
    const [idPacient, setIdPacient] = useState('');
    const [numarDeTelefonPacient, setNumarDeTelefonPacient] = useState('');




    const urmatoareaPaginaPacient = () => {
        if (cnpObtinut.length === 13) {
            Axios.get('http://localhost:8080/pacient/get_pacient_cnp/' + cnpObtinut).then(response => {
                console.log(response);
                if (response.data === "") {
                    toast.error("Cnp-ul introdus nu se afla in baza de date a spitalului",{position:toast.POSITION.TOP_CENTER});

                } else {
                    setVizibilitateDivTelefon(true);
                    setIdPacient(response.data.id);
                    setNumarDeTelefonPacient(response.data.numarDeTelefon);

                }

            })
        } else {
            toast.error("Cnp invalid, va rugam recompletati campul",{position:toast.POSITION.TOP_CENTER});
        }
        console.log(errorMessage);

    }

    const afisareEroare = () => {
        if (errorMessage !== null) {
            return (
                { errorMessage }
            )
        }
    }

    const sendOtp = () => {
        if (numarDeTelefon === numarDeTelefonPacient) {
            ApiStack.sendOtp(numarDeTelefon)

                .then((requestId) => {
                    setRequestId(requestId);
                    console.log(requestId);
                    console.log('Trimitere cu succes');
                    setvizibilitateDivVerificareTelefon(false);
                })
                .catch((err) => {
                    console.log(numarDeTelefon);
                    console.log(err);

                })
        } else {
            setvizibilitateDivVerificareTelefon(true);
            console.log(vizibilitateDivVerificareTelefon);
            setTimeout(() => {
                setvizibilitateDivVerificareTelefon(false)
            }, 3000);


        }


    }

    const verifyOtp = () => {
        ApiStack.verifyOtp(requestId, otp)
            .then((isVerified) => {
                console.log(`${isVerified}`);
                navigate(`/pacient/myprofile/${idPacient}`);

            })
            .catch((err) => {
                console.log(requestId);
                console.log(err);
            })
    }






    return (
        // <div className="card">
        // <AlertProvider>
        //     <div className="container_pacient">
        //         <label >Introduceti CNP-ul dumneavoastra</label>

        //         <input type='text' onChange={(e)=>{obtineCnpPacient(e.target.value)}}></input>

        //         <Alert/>
        //         <button onClick={urmatoareaPaginaPacient} >Mai departe</button>
        //         {errorMessage && <div className="error"> {errorMessage} </div>}
        //         {vizibilitateDivTelefon && <div className="verificare-telefon-otp">
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
        // </div>

        <div className="main_container">
            <h1 className="header_light">Be Patient</h1>
            <h2 className="header_light">Conectare</h2>
            <div className="card">

                <div>
                    <label htmlFor="Cnp">Introduceti CNP-ul dumneavoastra</label>
                    <InputText
                        name="Cnp"
                        className="form-control my-3"
                        onChange={(e) => { obtineCnpPacient(e.target.value) }}
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

export default Pacient;