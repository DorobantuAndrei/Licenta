
import axios from "axios";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { TreeTable } from 'primereact/treetable';
import { InputText } from 'primereact/inputtext';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './DataTableDemo.css';
import MainPage from "../MainPage/MainPage";


function RecenziiAsistente() {
    const [listaAsistente, setListAsistente] = useState([]);
    const [listaRecenzii, setListaRecenzii] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [recenzieTemp,setRecenzieTemp] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/asistant/get_all_asistants`).then(response => {
            setListAsistente(response.data);
        })
    }, [])


    const onRowExpand=(event)=>{
        axios.get(`http://localhost:8080/recenzie/get_recenzie_by_idAsistenta/${event.data.id}`).then(response=>{
            setRecenzieTemp(response.data);
        })
    }


    const rowExpansionTemplate = (data) => {
        return (
            <div>
                 <h5>Recenziile pentru {data.prenume}</h5>
                <DataTable removableSort className="card" value={recenzieTemp} responsiveLayout="scroll" showGridlines>
                    <Column sortable field="textRecenzie" header="Recenzie"></Column>
                    <Column sortable field="ratingAsistenta" header="Rating acordat" ></Column>
                </DataTable> 
            </div>
        );
    }



    return (
        <div>
            <MainPage></MainPage>
            <DataTable className="card" value={listaAsistente} showGridlines filterDisplay="row"
                emptyMessage="nu există date"
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
                <Column field="nume" header="Nume" filter style={{ minWidth: '10rem' }} ></Column>
                <Column field="prenume" header="Prenume" filter style={{ minWidth: '10rem' }} ></Column>
                <Column field="rating" header="Rating" filter style={{ minWidth: '10rem' }} ></Column>
                <Column field="varsta" header="Varsta" filter style={{ minWidth: '10rem' }} ></Column>
            </DataTable>
        </div>
    )
}



export default RecenziiAsistente;