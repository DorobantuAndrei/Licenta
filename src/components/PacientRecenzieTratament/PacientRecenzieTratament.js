import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProfilPacient from "../ProfilPacient/ProfilPacient";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';




function PacientTratamentRecenzie() {
    const { idPacient } = useParams();
    const [recenzie, setRecenzie] = useState([]);
    const [textRecenzie, setTextRecenzie] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/recenzie_tratament/get_recenzie_by_idPacient/${idPacient}`).then(response => {
            setRecenzie(response.data);
            console.log(response.data);
        })

    }, [])

    const modificaRecenzia = (id, idTratamentParam, event) => {
        console.log(recenzie);
        event.preventDefault();
        let recenzieNoua = {
            idPacient: id,
            idTratament: idTratamentParam,
            textRecenzie: textRecenzie
        }
        axios.put(`http://localhost:8080/recenzie_tratament/update_recenzie_byP/${idPacient}`, recenzieNoua).then(
            toast.success("Modificare cu succes", { position: toast.POSITION.TOP_CENTER })
        ).catch(err => {
            toast.error(err, { position: toast.POSITION.TOP_CENTER })
        })
    }

    const vizualizareRecenzie = () => {
        console.log(recenzie);
        return recenzie.map((recenzieMap) => {
            return (
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Recenzia dumneavoastra la tratament</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" defaultValue={recenzieMap.textRecenzie}
                            onChange={(event) => {
                                setTextRecenzie(event.target.value)
                            }} />
                        <small id="emailHelp" class="form-text text-muted">Recenziile vor ajuta asistentele si doctori pentru a va oferi cele mai bun tratament.</small>
                    </div>
                    <button onClick={(event) => { modificaRecenzia(recenzieMap.idPacient, recenzieMap.idTratament, event) }} class="btn btn-primary">Modifica recenzia</button>
                </form>
            )
        })
    }

    const cercetare=()=>{
        console.log(recenzie);
    }


    return (<div>
        {/* {vizualizareRecenzie()} */}
        <ProfilPacient></ProfilPacient>
        <div className="main_container">
        <div className="card">
            <div className="p-fluid grid">
                <div className="field col-12 md:col-4">
                    <label htmlFor="recenzieTratament">Recenzia dumneavoastra la tratament</label>
                    <InputText id="recenzieTratament" className="form-control my-3"  onChange={(event) => {
                                setTextRecenzie(event.target.value)
                            }}/>
                    <Button label="Modifica recenzia tratamentului" className="p-button-success form-control my-3" onClick={(event) => { modificaRecenzia(recenzie[0].idPacient, recenzie[0].idTratament, event) }} />
                </div>
            </div>
        </div>
        </div>
        <ToastContainer />
    </div>
    )
}





export default PacientTratamentRecenzie;