import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { string } from "sockjs-client/lib/utils/random";
import Table from 'react-bootstrap/Table';
import ProfilAsistenta from "../ProfilAsistenta/ProfilAsistanta";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

function Pacient() {

    const { idAsistenta } = useParams();
    const [listaPacienti, setListaPacienti] = useState([])
    const [listaTratamente, setListaTratamente] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [sectie, setSectie] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        Axios.get(`http://localhost:8080/asistant/get_asistant_by_id/${idAsistenta}`).then(response => {
            console.log(response.data);
            switch (response.data.idSectie) {
                case 1:
                    setSectie("Pediatrie")
                    break;
                case 2:
                    setSectie("Cardiologie")
                    break;
                case 3:
                    setSectie("ORL")
                    break;
                case 4:
                    setSectie("Chirurgie")
                    break;
                case 5:
                    setSectie("Oncologie")
                    break;
                default:
                    sectie = "Nespecificat"
            }
            Axios.get(`http://localhost:8080/pacient/get_pacient_by_idSectie/${response.data.idSectie}`).then(response2 => {
                console.log(response2.data);
                setListaPacienti(response2.data);
                Axios.get(`http://localhost:8080/treatment/get_all_treatments`).then(response3 => {
                    console.log(response3.data);
                    setListaTratamente(response3.data);
                })

            })
        }

        )
    }, [])

    const afisareTratamentPacient = (id) => {

        let tratament = "";

        listaTratamente.forEach(element => {
            if (element.idPacient === id) {
                console.log(element.tratament);
                tratament = element.tratament;
            }
        });

        return tratament;
    }

    const afisareRecenzieTratament = (id) => {
        let recenzieText;
        Axios.get(`http://localhost:8080/recenzie_tratament/get_recenzie_by_idPacient/${id}`).then(response => {
            recenzieText = response.data.textRecenzie;
        });

        return recenzieText;

    }


    // const afisarelistaPacienti =()=>{
    //     return listaPacienti.map((pacient)=>{
    //         return(
    //             <div className="pacient-container">
    //                 <h4>{pacient.nume}</h4>
    //                 <h5>{pacient.prenume}</h5>
    //                 <label for="input_dp">Diagnostic Pacient</label>
    //                 <input type="text" value={pacient.diagnosticPrincipal} id="input_dp"></input>
    //                 <label for="input_ds">Diagnostic secundar</label>
    //                 <input type="text" value={pacient.diagnosticeSecundare} id="input_ds"></input>
    //                 <label for="input_ds">Diagnostic secundar</label>
    //                 <input type="text" value={pacient.diagnosticeSecundare} id="input_ds"></input>
    //                 <label for="tratament_input">Tratament</label>
    //                 <input type="text" value={afisareTratamentPacient(pacient.id)} id="input_ds"></input>
    //                 <label>Recenziile Tratamentului:</label>
    //                 <input type="text" value={afisareRecenzieTratament(pacient.id)}></input>
    //             </div>
    //         )
    //     })
    // }

    const cererilePacientului = (id) => {
        navigate(`/asistenta/myprofile/${idAsistenta}/pacienti/cereri-asistenta/${id}`);
    }

    const tratamentulPacientului = (id) => {
        navigate(`/asistenta/myprofile/${idAsistenta}/pacienti/tratament-pacient/${id}`)
    }

    const vizualizarePacienti = () => {
        return listaPacienti.map((pacient) => {
            let sectie = "";
            switch (pacient.idSectie) {
                case 1:
                    sectie = "Pediatrie"
                    break;
                case 2:
                    sectie = "Cardiologie"
                    break;
                case 3:
                    sectie = "ORL"
                    break;
                case 4:
                    sectie = "Chirurgie"
                    break;
                case 5:
                    sectie = "Oncologie"
                    break;
                default:
                    sectie = "Nespecificat"
            }
            return (
                <tr>
                    <td>{pacient.nume}</td>
                    <td>{pacient.prenume}</td>
                    <td>{pacient.diagnosticPrincipal}</td>
                    <td>{pacient.diagnosticeSecundare}</td>
                    <td>{sectie}</td>
                    <td>
                        <Button label="Cererile pacientului" className="p-button-success"  onClick={() => { cererilePacientului(pacient.id) }} />
                        <Button variant="success" onClick={() => { tratamentulPacientului(pacient.id) }}>Tratamentul pacientului</Button>
                    </td>
                </tr>
            )
        })



    }

    const rowExpansionTemplate = (data) => {
        return (
            <div >
                <Button label="Cererile pacientului" className="p-button-success margin-left-button"  onClick={() => { cererilePacientului(data.id) }} />
                <Button label="Tratamentul pacientului" className="p-button-success margin-left-button"  onClick={() => { tratamentulPacientului(data.id) }} />
            </div>
        )
    }

    const onRowExpand = (event) => {
        console.log(event);
    }

    return (
        // <div>
        //     {afisarelistaPacienti()}
        // </div>
        <div>
            <ProfilAsistenta></ProfilAsistenta>
            <div className="card">
                <DataTable className="card" value={listaPacienti} showGridlines filterDisplay="row"
                    globalFilterFields={'status'}
                    rowExpansionTemplate={rowExpansionTemplate}
                    removableSort
                    paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Vizibil de la {first} la {last} din {totalRecords} pacienti"
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    expandedRows={expandedRows}
                    onRowExpand={onRowExpand}
                    header={sectie}>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="nume" header="Prenumele pacientului" filter style={{ minWidth: '10rem' }} ></Column>
                    <Column field="prenume" header="Numele pacientului" filter style={{ minWidth: '10rem' }} ></Column>
                    <Column field="sexPacient" header="Sex Pacient" filter style={{ minWidth: '10rem' }} ></Column>
                    <Column field="diagnosticPrincipal" header="Diagnostic principal" filter style={{ minWidth: '10rem' }} ></Column>
                    <Column field="diagnosticeSecundare" header="Diagnostice secundare" filter style={{ minWidth: '10rem' }} ></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Pacient;