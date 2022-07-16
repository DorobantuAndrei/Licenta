import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Knob } from 'primereact/knob';
import { Donut } from 'react-dial-knob';
import { toast, ToastContainer } from 'react-toastify';
import ProfilAsistenta from "../ProfilAsistenta/ProfilAsistanta";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function TratamentPacient() {
    const { idPacient } = useParams();
    const [tratamentPacient, setTratamentPacient] = useState([]);
    const [valoareTratament, setValoareTratament] = useState(0);
    const [idTratament, setIdTratament] = useState(0);
    const [tratamentNou, setTratamentNou] = useState("");
    const [tratament, setTratament] = useState([]);
    const [pacient, setPacient] = useState([]);
    const mapaCuvinte = new Map([
        ['bine', 40],
        ['foarte bine', 60],
        ['bun', 30],
        ['rau', -4],
        ['binisor', 10],
        ['nu ma simt rau', 5],
        ['nu ma simt bine', -10],
        ['ma simt mai bine', 0],
        ['ma simt mai rau', 0],
        ['linistit', 30],
        ['agitat', -20],
        ['ma doare', -30],
        ['doare', -30],
        ['durere', -30],
        ['ametit', -20],
        ['foarte ametit', -40],
        ['ameteala', -30],
        ['greata', -30],
        ['vomit', -20],
        ['voma', -20]
    ])
    const [textRecenzieTratament, setTextRecneizeTratament] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:8080/pacient/get_pacient_id/${idPacient}`).then(response => {
            setPacient(response.data);
        })
        axios.get(`http://localhost:8080/treatment/get_treatment_idPacient/${idPacient}`).then(response => {
            const tratamentTemp = {
                idTratament: response.data.idTratament,
                idPacient: response.data.idPacient,
                tratament: response.data.tratament
            }
            debugger;
            setTratament(response.data);
            setTextRecneizeTratament(response.data.tratament);
            setIdTratament(response.data.idTratament);
            const cuvinteTextRecenzie = textRecenzieTratament.split(" ");

            setTratamentPacient(tratamentTemp);
        })

        axios.get(`http://localhost:8080/recenzie_tratament/get_recenzie_by_idPacient/${idPacient}`).then(response => {
            debugger;
            setValoareTratament(getValoareTemporara(response.data[0].textRecenzie));
        })


    }, [])

    const modificaTratamentPacient = () => {
        const tratamentModificat = {
            idTratament: idTratament,
            idPacient: idPacient,
            tratament: textRecenzieTratament
        }
        axios.put(`http://localhost:8080/treatment/update_treatment/${idTratament}`, tratamentModificat);
        toast.success("Modificarea tratamentului a avut succes", { position: toast.POSITION.TOP_CENTER });



    }

    const getValoareTemporara = (text) => {
        const stringConverter = String(text);
        const cuvinteTextRecenzie = text;
        let valoareTratamentTemp = 0;
        mapaCuvinte.forEach((value, key) => {
            if (stringConverter.includes(key)) {
                console.log(mapaCuvinte.get(key));
                valoareTratamentTemp += mapaCuvinte.get(key);
            }
        })
        setValoareTratament(valoareTratamentTemp);
        return valoareTratamentTemp;
    }

    const handleTratament = (event) => {
        setTextRecneizeTratament(event.target.value);
    }
    return (
        <div>
            <ProfilAsistenta></ProfilAsistenta>
            <div className="main_container">
                <div className="card">
                    <div className="p-fluid grid">
                        <div className="field col-12 md:col-4">
                            <h1>{`Scorul tratamentului pentru ${pacient.nume} ${pacient.prenume}`}</h1>
                        </div>
                        <label htmlFor="recenzieTratament">Tratamentul acordat pacientului</label>
                        <InputText
                            id="recenzieTratament"
                            name="Verificare_cnp"
                            className="form-control my-3"
                            defaultValue={tratament.tratament}
                            onChange={handleTratament}
                        />
                        <Button className="buton_login" onClick={() => { modificaTratamentPacient(idTratament) }}>Modifica tratament</Button>
                        <div className="field col-12 md:col-4">
                        <label htmlFor="recenzieTratament">Scorul tratamentului</label>
                            <Donut
                                diameter={200}
                                min={0}
                                max={100}
                                step={1}
                                value={valoareTratament}
                                theme={{
                                    donutColor: 'blue'
                                }}
                                disabled
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                            </Donut>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TratamentPacient;