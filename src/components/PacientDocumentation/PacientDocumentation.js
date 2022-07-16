import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import ProfilPacient from "../ProfilPacient/ProfilPacient";
import { Button } from 'primereact/button';
function PacientDocumentation() {
    const [pacient, setPacient] = useState([]);
    const { idPacient } = useParams();
    const [tratamentPacient, setTratamentPacient] = useState([])
    const [textTratament, setTextTratament] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`http://localhost:8080/pacient/get_pacient_id/${idPacient}`).then(response => {
            setPacient(response.data);
            console.log(response.data);
            Axios.get(`http://localhost:8080/treatment/get_treatment_idPacient/${idPacient}`).then(response2 => {
                setTratamentPacient(response2.data);
                console.log(response2.data);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })

    }, [])

    const vizualizareTratemente = () => {
        return <input type="text" defaultValue={tratamentPacient.tratament}></input>
    }

    const adaugaRecenzieTratament = (event) => {
        axios.get(`http://localhost:8080/recenzie_tratament/get_recenzie_by_idPacient/${idPacient}`).then(response => {

            if (response.data.length > 0) {
                toast.error("Nu mai puteti adauga recenzii pentru acest tratament", { position: toast.POSITION.TOP_CENTER });
            }
        })
        event.preventDefault();
        console.log(textTratament);
        let tratament = {
            idPacient: idPacient,
            idTratament: pacient.idTratament,
            textRecenzie: textTratament
        }
        Axios.post(`http://localhost:8080/recenzie_tratament/add`, tratament).catch(err => {
            console.log(err);
        })

        console.log("merge");
    }

    const modificaRecenzia = () => {
        navigate(`/pacient/myprofile/${idPacient}/pacient_documentation/modifica-recenzie`);
    }



    const vizualizareFisaPacient = () => {

        return (
            <form>
                <h3>Fisa pacientului</h3>
                <div class="row">
                    <label>Nume Pacient</label><input type="text" placeholder="First Name" required defaultValue={pacient.nume} readOnly />
                    <label>Prenume Pacient</label><input type="text" placeholder="Last Name" required defaultValue={pacient.prenume} readOnly />
                    <label>CNP </label><input type="text" required defaultValue={pacient.cnp} readOnly />
                    <label>Sex </label><input type="text" defaultValue={pacient.sexPacient} readOnly />
                    <label>Data nasterii </label><input type="text" defaultValue={pacient.dataNasterii} readOnly />
                    <label>Ocupatie </label><input type="text" defaultValue={pacient.ocupatie} readOnly />
                    <label>Diagnostic principal </label><input type="text" defaultValue={pacient.diagnosticPrincipal} readOnly />
                    <label>Diagnostic secundar </label><input type="text" defaultValue={pacient.diagnosticeSecundare} readOnly />
                    <label>Tratament</label>
                    <div>
                        {vizualizareTratemente()}
                    </div>
                    <div>
                        <h3>Cum va simtiti dupa tratament ?</h3>
                        <textarea onChange={(e) => { setTextTratament(e.target.value) }}></textarea>
                        <button className="primary" onClick={adaugaRecenzieTratament}>Trimite</button>
                        <button className="primary" onClick={modificaRecenzia}>Modifica Recenzia</button>

                    </div>



                </div>
            </form>
        )
    }
    return (
        <div className="container-fisa-pacient">
            <ProfilPacient></ProfilPacient>
            <div className="main_container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="p-fluid grid">
                        <div className="field col-12 md:col-4">
                            <h1>{pacient.nume} {pacient.prenume}</h1>
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="pacientCnp">CNP</label>
                            <InputText id="pacientCnp" defaultValue={pacient.cnp} className="form-control my-3" readOnly/>
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="sexPacient">Sex Pacient</label>
                            <InputText id="sexPacient" defaultValue={pacient.sexPacient} className="form-control my-3" readOnly/>
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="dataNasterii">Data nasterii</label>
                            <InputText id="dataNasterii" defaultValue={pacient.dataNasterii} className="form-control my-3" readOnly/>
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="dataNasterii">Ocupatie</label>
                            <InputText defaultValue={pacient.ocupatie} className="form-control my-3" readOnly/>
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="dataNasterii">Diagnostic principal</label>
                            <InputText defaultValue={pacient.diagnosticPrincipal} className="form-control my-3" readOnly/>
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="dataNasterii">Diagnostice secundare</label>
                            <InputText defaultValue={pacient.diagnosticeSecundare} className="form-control my-3" readOnly/>
                        </div>
                        <InputTextarea rows={2} cols={20} className="form-control my-3" placeholder="Trimiteti in cuvinte cat mai specifice o recenzie despre tratament" onChange={(e) => { setTextTratament(e.target.value) }}/>
                        <Button label="Trimite recenzia tratamentului" className="p-button-success form-control my-3" icon="pi pi-check" iconPos="right" onClick={adaugaRecenzieTratament}/>
                        <Button label="Modifica recenzia tratamentului" className="p-button-success form-control my-3"  onClick={modificaRecenzia} />
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>

    )
}

export default PacientDocumentation;