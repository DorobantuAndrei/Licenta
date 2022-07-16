import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menubar } from 'primereact/menubar';


function ProfilAsistenta() {
    const { idAsistenta } = useParams();
    const navigate = useNavigate();
    const [asistenta, setAsistenta] = useState([])
    useEffect(() => {
        Axios.get(`http://localhost:8080/asistant/get_asistant_by_id/${idAsistenta}`).then(response => {
            console.log(response);
            setAsistenta(response.data);
            debugger;
            const asistentaTemp = {
                id: response.data.id,
                nume: response.data.nume,
                prenume: response.data.prenume,
                idSectie: response.data.idSectie,
                varsta: response.data.varsta,
                rating: response.data.rating,
                codAsistenta: response.data.codAsistenta,
                esteInProgram: true,
                numarDeTelefon: response.data.numarDeTelefon
            }
            asistenta.esteInProgram = true;
            axios.put(`http://localhost:8080/asistant/update_asistant/${idAsistenta}`, asistentaTemp);

        })
    }, [])

    const items = [
        {
            label: 'Pacienti',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigate(`/asistenta/myprofile/${idAsistenta}/pacienti`);
            }
        },
        {
            label: 'Comunica cu alte asistente',
            icon: 'pi pi-fw pi-calendar',
            command: () => {
                navigate(`/asistenta/myprofile/${idAsistenta}/chat-room`);
            }
        },
        {
            label: 'Incheie program',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                asistenta.esteInProgram = false;
                axios.put(`http://localhost:8080/asistant/update_asistant/${asistenta.id}`, asistenta).then(() => {
                    navigate(`/`);
                })
            }
        }
    ]



    const incheieProgram = () => {

    }
    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}

export default ProfilAsistenta;