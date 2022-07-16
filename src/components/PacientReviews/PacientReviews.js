import React from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import ProfilPacient from "../ProfilPacient/ProfilPacient";
import { Rating } from 'primereact/rating';


function PacientReviews() {

    const { idPacient } = useParams();
    const [recenzii, setRecenzii] = useState([]);
    const [rating, setRating] = useState(0);
    const [textArea, setTextArea] = useState("");
    const [val1, setVal1] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);


    useEffect(() => {
        Axios.get(`http://localhost:8080/recenzie/get_recenzie_by_idPacient/${idPacient}`).then(response => {
            setRecenzii(response.data);
            console.log(response.data);
        })
    }, []);

    const stergeRecenzia = (id) => {
        console.log(id);
        Axios.delete(`http://localhost:8080/recenzie/delete_review/${id}`).then(() => {
            setRecenzii(recenzii.filter(recenzie => recenzie.idRecenzie !== id));
        }).catch(err => {
            console.log(err);
        })
    }

    const editeazaRecenzie = (idRecenzie, idAsistentaParam, idPacientParam, prenumeParam) => {
        let recenzieNoua = {
            idAsistenta: idAsistentaParam,
            idPacient: idPacientParam,
            textRecenzie: textArea,
            ratingAsistenta: val1,
            prenumeAsistenta: prenumeParam
        }
        console.log(recenzieNoua);
        axios.put(`http://localhost:8080/recenzie/update_recenzie_asistenta/${idRecenzie}`, recenzieNoua).then(response => {
            toast.success("Modificare realizata cu succes", { position: toast.POSITION.TOP_CENTER })
            console.log(response.data);
        }).catch(err => {
            toast.error(err, { position: toast.POSITION.TOP_CENTER })
        })
        setInterval(() => {
            document.location.reload(true);
        }, 2000);
    }

    const handleRating = (rate) => {
        setRating(rate / 20)
        // other logic
    }

    const handleRecenzie = (event) => {
        setTextArea(event.target.value);
    }

    const vizualizareRecenzii = () => {
        return recenzii.map((recenzie) => {
            return (<div class="card-container">
                <h3>{recenzie.prenumeAsistenta}</h3>
                <img class="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                <div class="buttons">
                    <h6>Recenzia dumneavoastra</h6>
                    <Rating onClick={handleRating} ratingValue={recenzie.ratingAsistenta} />
                    <p>Rating - {recenzie.ratingAsistenta}</p>
                    <textarea defaultValue={recenzie.textRecenzie} onChange={handleRecenzie}></textarea>
                    <div class="cerere-container">
                        <button class="primary text-cerere" onClick={() => { }}>Modifica Recenzie</button>
                    </div>
                    <button class="primary ghost" onClick={() => { stergeRecenzia(recenzie.idRecenzie) }}>
                        Sterge recenzie
                    </button>
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
                <div className="field col-12 md:col-4">
                    <label htmlFor="inputTextRecenzie">Introudecti noua recenzie</label>
                    <InputTextarea id="inputTextRecenzie" rows={2} cols={90} defaultValue={data.textRecenzie} onChange={handleRecenzie} />
                </div>
                <div className="field col-12 md:col-4">
                    <label htmlFor="ratingNou">Introudecti noul rating</label>
                    <Rating id="ratingNou" value={val1} onChange={(e) => setVal1(e.value)} stars={5} cancel={false} />
                </div>
                <div className="field col-12 md:col-4">
                    <Button className="buton_login" onClick={() => { editeazaRecenzie(data.idRecenzie, data.idAsistenta, data.idPacient, data.prenumeAsistenta) }}>Modifica recenzia</Button>
                    <Button label="Stergere recenzie" className="p-button-danger mr 2"  onClick={() => { stergeRecenzia(data.idRecenzie) }}/>
                </div>
            </div>
        )
    }

    return (
        <div>
            <ProfilPacient></ProfilPacient>
            <div className="card">
                <DataTable className="card" value={recenzii} showGridlines filterDisplay="row"
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
                    <Column field="prenumeAsistenta" header="Prenumele asistentei" filter style={{ minWidth: '10rem' }} ></Column>
                    <Column field="textRecenzie" header="Textul recenziei" filter style={{ minWidth: '10rem' }} ></Column>
                    <Column field="ratingAsistenta" header="Rating" filter style={{ minWidth: '10rem' }} ></Column>
                </DataTable>
                <ToastContainer />
            </div>

        </div>

    )
}

export default PacientReviews;