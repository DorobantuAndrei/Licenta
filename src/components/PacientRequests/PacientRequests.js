import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import ProfilPacient from "../ProfilPacient/ProfilPacient";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PacientRequests() {
    const { idPacient } = useParams();
    const [cereri, setCereri] = useState([]);
    const [isDivVisible, setIsDivVisible] = useState(false);
    const navigate = useNavigate();
    const [textArea, setTextArea] = useState("");
    const [expandedRows, setExpandedRows] = useState(null);

    useEffect(() => {
        Axios.get(`http://localhost:8080/request/get_request_by_pacientId/${idPacient}`).then(response => {
            console.log(response.data);
            setCereri(response.data);
        })
    }, []);

    const editeazaCerere = (idCerereParam, idPacientParam, idAsistentaParam, prenumeAsistentaParam) => {
        let cerereNoua = {
            idPacient: idPacientParam,
            idAsistenta: idAsistentaParam,
            cerere: textArea,
            prenumeAsistenta: prenumeAsistentaParam
        }
        axios.put(`http://localhost:8080/request/update_request/${idCerereParam}`, cerereNoua).then(() => {
            toast.success("Modificare cu succes", { position: toast.POSITION.TOP_CENTER });
        })
    }

    const stergereCerere = (id) => {
        axios.delete(`http://localhost:8080/request/delete_request/${id}/${idPacient}`).then(response => {
            setCereri(response.data);

        }).catch(err => {
            console.log(err);
        })
        window.location.reload();
    }

    const vizualizareCereri = () => {
        return cereri.map((cerere) => {

            return (<div class="card-container">
                <h3>{cerere.prenumeAsistenta}</h3>
                <img class="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                <div class="buttons">
                    <h6>Cererea dumneavoastra</h6>
                    <div class="cerere-container">
                        <textarea placeholder='Introduceti cererea' className='text-cerere' defaultValue={cerere.cerere} onChange={(event) => {
                            setTextArea(event.target.value);
                        }}></textarea>
                        <button class="primary text-cerere" onClick={() => { editeazaCerere(cerere.idCerere, cerere.idPacient, cerere.idAsistenta, cerere.prenumeAsistenta) }}>Editeaza Cerere</button>
                    </div>
                    <button class="primary ghost" onClick={() => { stergereCerere(cerere.idCerere) }}>
                        Sterge cerere
                    </button>
                </div>
                <div class="skills">
                    <h6>Sectia</h6>
                    <ul>
                        <li>{cerere.idCerere}</li>
                    </ul>
                </div>
            </div>);
        })
    }

    const onRowExpand = (event) => {
        console.log(event);
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div >
                <InputTextarea rows={2} cols={60} defaultValue={data.cerere} onChange={(event) => { setTextArea(event.target.value); }} />
                <Button label="Stergere Cerere" className="p-button-danger mr 2" style={{ float: "right" }} onClick={() => { stergereCerere(data.idCerere) }} />
                <Button className="buton_login" onClick={() => { editeazaCerere(data.idCerere, data.idPacient, data.idAsistenta, data.prenumeAsistenta) }} style={{ float: "right" }}>Modifica cererea</Button>
            </div>
        )
    }

    return (
        <div>
            <ProfilPacient></ProfilPacient>
            <div className="card">
                <DataTable className="card" value={cereri} showGridlines filterDisplay="row"
                    globalFilterFields={'status'}
                    rowExpansionTemplate={rowExpansionTemplate}
                    removableSort
                    paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Vizibil de la {first} la {last} din {totalRecords} asistente"
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    expandedRows={expandedRows}
                    onRowExpand={onRowExpand}>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="prenumeAsistenta" header="Prenumele asistentei" filter style={{ minWidth: '10rem' }} sortable ></Column>
                    <Column field="cerere" header="Textul cererii" filter style={{ minWidth: '10rem' }} sortable></Column>
                </DataTable>
                <ToastContainer />
            </div>
        </div>
    )
}

export default PacientRequests;