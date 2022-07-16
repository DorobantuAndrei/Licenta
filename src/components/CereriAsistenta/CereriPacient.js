import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Accordion, AccordionTab } from 'primereact/accordion';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputTextarea } from 'primereact/inputtextarea';
import ProfilAsistenta from "../ProfilAsistenta/ProfilAsistanta";



function CereriPacient() {

    const { idAsistenta } = useParams();
    const { idPacient } = useParams();
    const [cereriPacient, setCereriPacient] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/request/cerere-pacient-asistenta/${idPacient}/${idAsistenta}`).then(response => {
            setCereriPacient(response.data);
        })
    }, [])

    const vizualizareCereri = () => {
        if (cereriPacient.length > 0) {
            return cereriPacient.map(cerere => {
                return (
                    <AccordionTab header={`${cerere.prenumeAsistenta}`}>
                        <InputTextarea rows={5} cols={30} value={cerere.cerere} disabled />
                    </AccordionTab>
                )
            })
        }
        else {
            return (
                <AccordionTab header="Cereri inexistente">
                    <InputTextarea rows={5} cols={30} value="Pacientul nu a depus nicio cerere" disabled />
                </AccordionTab>
            )
        }

    }

    return (
        <div>
            <ProfilAsistenta></ProfilAsistenta>
            <div className="card">
                <Accordion multiple>
                    {vizualizareCereri()}
                </Accordion>
            </div>
        </div>
    )
}

export default CereriPacient;