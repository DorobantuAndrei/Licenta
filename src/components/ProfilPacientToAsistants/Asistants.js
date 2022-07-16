import React, { useState } from 'react'
import Axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Asistatnts.css';
import { toast, ToastContainer } from 'react-toastify'
import ProfilPacient from '../ProfilPacient/ProfilPacient';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

function Asistatns() {

    const navigate = useNavigate();
    const { idPacient } = useParams();
    const [asistente, setAsistente] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [asistenteFinale, setAsistenteFinale] = useState({

    })
    const [pacient, setPacient] = useState();
    const [cerere, setCerere] = useState({
        idPacient: '',
        idAsistenta: '',
        cerere: ''
    });
    let asistenteFinal = new Array();

    const [continutCerere, setContinutCerere] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:8080/pacient/get_pacient_id/" + idPacient).then(response => {
            setPacient(response.data);
            Axios.get("http://localhost:8080/asistant/get_all_active_by_section/" + response.data.idSectie).then(response2 => {
                console.log(response2.data);
                for (let i = 0; i < response2.data.length; i++) {
                    Axios.get("http://localhost:8080/recenzie/get_recenzie_by_idAsistenta/" + response2.data[i].id).then(response3 => {

                        let sumaRating = 0;
                        for (let i = 0; i < response3.data.length; i++) {
                            sumaRating += response3.data[i].ratingAsistenta;
                        }
                        console.log(response2.data[i].rating);
                        let asistentaFinala = {
                            id: response2.data[i].id,
                            nume: response2.data[i].nume,
                            prenume: response2.data[i].prenume,
                            idSectie: response2.data[i].idSectie,
                            varsta: response2.data[i].varsta,
                            rating: sumaRating / response3.data.length,
                            codAsistenta: response2.data[i].codAsistenta,
                            esteInProgram: response2.data[i].esteInProgram,
                            numarDeTelefon: response2.data[i].numarDeTelefon
                        }
                        console.log(response2.data[i]);
                        console.log(response2.data[i].id);
                        Axios.put(`http://localhost:8080/asistant/update_asistant/${response2.data[i].id}`, asistentaFinala);



                    })


                }
                setAsistente(response2.data);

            })




        })


    }, [])


    const trimiteCerere = (id, prenume) => {
        let cerere2 = {
            idPacient: pacient.id,
            idAsistenta: id,
            cerere: continutCerere,
            prenumeAsistenta: prenume

        }
        Axios.post("http://localhost:8080/request/add", cerere2);
        toast.success("Cerere trimisa cu succes", { position: toast.POSITION.TOP_CENTER });

    }

    const handleCerere = (event) => {
        setContinutCerere(event.target.value);
    }


    const navigareCatreAsistenteReview = (id) => {
        navigate(`/pacient/myprofile/${idPacient}/medical_asistants/${id}/asistant_review`);
    }

    const vizualizareAsistente = () => {
        console.log(asistente);
        return asistente.map((asistenta) => {
            let ratingNou = asistenta.rating;
            console.log(ratingNou);
            return (<div class="card-container">
                <span class="pro">{asistenta.rating.toFixed(2)}</span>
                <img class="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                <h3>{asistenta.prenume}</h3>
                <h6>{asistenta.nume}</h6>
                <div class="buttons">
                    <div class="cerere-container">
                        <textarea placeholder='Introduceti cererea' className='text-cerere' onChange={handleCerere}></textarea>
                        <button class="primary text-cerere" onClick={() => {

                            trimiteCerere(asistenta.id, asistenta.prenume);
                        }}>Trimite Cerere</button>
                    </div>
                    <button class="primary ghost" onClick={() => {

                        navigareCatreAsistenteReview(asistenta.id);
                    }}>
                        Recenzie
                    </button>
                </div>
                <div class="skills">
                    <h6>Sectia</h6>
                    <ul>
                        <li>{asistenta.idSectie}</li>
                    </ul>
                </div>
                <ToastContainer />
            </div>);


        })
    }

    const navigareCatreCereri = () => {
        navigate(`/pacient/myprofile/${idPacient}/medical_asistants/myrequests`);
    }

    const navigareCatreRecenzii = () => {
        navigate(`/pacient/myprofile/${idPacient}/medical_asistants/myreviews`);
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div >
                <InputTextarea rows={2} cols={45} onChange={handleCerere} autoResize className='mb-2' placeholder='Introduce-ti cererea dumneavoastra' />
                <Button label="Trimite cererea" className="p-button-success margin-left-button" icon="pi pi-check" iconPos="right" onClick={() => {

                    trimiteCerere(data.id, data.prenume);
                }} />
                <Button label={`Trimite o recenzie pentru asistenta ${data.prenume}`} style={{ float: "right" }} className="p-button-help "
                    onClick={() => {
                        navigareCatreAsistenteReview(data.id);
                    }} />
            </div>
        )
    }

    const onRowExpand = (event) => {
        console.log(event);
    }


    return (
        <div className='container-medical-asistants'>
            <ProfilPacient></ProfilPacient>
            <DataTable className="card" value={asistente} showGridlines filterDisplay="row"
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
                <Column field="prenume" header="Prenumele asistentei" filter style={{ minWidth: '10rem' }} ></Column>
                <Column field="nume" header="Numele asistentei" filter style={{ minWidth: '10rem' }} ></Column>
                <Column field="rating" header="Rating" filter style={{ minWidth: '10rem' }} ></Column>
            </DataTable>
            <ToastContainer/>
        </div>

    )
}

export default Asistatns;