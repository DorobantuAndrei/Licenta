import React from "react";
import { useNavigate } from "react-router-dom";
import './MainPage.css'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

function MainPage() {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Pacient',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigate('/pacient')
            }
        },
        {
            label: 'Asistenta',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigate('/asistenta')
            }
        },
        {
            label: 'Recenzii Asistente',
            icon: 'pi pi-fw pi-calendar',
            command: () => {
                navigate('/recenzii-asistente')
            }
        }
    ]
    return (
        // <div className="container-mainpage">
        //    <nav className="navbar-container" >
        //         <ul>
        //             <li><button className="button-nav" onClick={()=>{navigate('/pacient')}}>Pacient</button></li>
        //             <li><button className="button-nav" onClick={()=>{navigate('/asistenta')}}>Asistenta</button></li>
        //             <li><button className="button-nav" onClick={()=>{navigate('/recenzii-asistente')}}>Recenzii Asistenta</button></li>
        //             <li><button className="button-nav" onClick={()=>{navigate('/recenzii-tratamente')}}>Recenziile pacientilor</button></li>
        //         </ul>
        //    </nav>
        // </div>
        <div>
            <div className="card">
                <Menubar model={items} />
            </div>
            <div className="center-div"></div>
        </div>




    )
}

export default MainPage;