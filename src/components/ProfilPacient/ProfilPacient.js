import React, { useEffect, useState } from "react";
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { jsPDF } from "jspdf"

function ProfilPacient() {
    const navigate = useNavigate();
    const { idPacient } = useParams();
    const [isRequestTrue, setIsRequestTrue] = useState(false);
    const [pacient, setPacient] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/pacient/get_pacient_id/${idPacient}`).then(response => {
            setPacient(response.data);
        })
    }, [])
    const items = [
        {
            label: 'Asistente',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigate(`/pacient/myprofile/${idPacient}/medical_asistants`);
            }
        },
        {
            label: 'Comunica cu alti pacienti',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigate(`/pacient/myprofile/${idPacient}/chat-room`);
            }
        },
        {
            label: 'Fisa pacientului',
            icon: 'pi pi-fw pi-file',
            command: () => {
                navigate(`/pacient/myprofile/${idPacient}/pacient_documentation`);
            }
        },
        {
            label: 'Cererile mele',
            icon: 'pi pi-fw pi-file',
            command: () => {
                navigate(`/pacient/myprofile/${idPacient}/medical_asistants/myrequests`);
            }
        },
        {
            label: 'Recenziile mele pacientului',
            icon: 'pi pi-fw pi-file',
            command: () => {
                navigate(`/pacient/myprofile/${idPacient}/medical_asistants/myreviews`);
            }
        },
        {
            label: 'Cerere de externare',
            icon: 'pi pi-fw pi-exclamation-circle',
            command: () => {
                setIsRequestTrue(true);
            }
        }
    ]

    const externarePacient = (data) => {
        generareDocument();
        axios.delete(`http://localhost:8080/pacient/delete_pacient/${idPacient}`).then(() => {
            toast.success("Documentele au fost generate, externare realizata cu succes", { position: toast.POSITION.TOP_CENTER });
        }).catch(err => {
            toast.error(`Problema la externare ${err}`, { position: toast.POSITION.TOP_CENTER });
        })
        setIsRequestTrue(false);
        setInterval(() => {
            navigate('/');
        }, 2000);
    }

    const generareDocument = () => {
        const doc = new jsPDF('landscape', 'px', 'a4', 'false');
        const currentDate = new Date();
        doc.setFont('Helvetica', 'bold')
        doc.text(250, 20, 'Fisa de externare');
        doc.text(30, 40, `Datele pacientului`)
        doc.text(30, 70, `Numele pacientului : ${pacient.nume}`);
        doc.text(30, 90, `Prenumele pacientului: ${pacient.prenume}`);
        doc.text(30, 110, `Codul numeric personal al pacientului: ${pacient.cnp}`);
        doc.text(30, 130, `Sex pacient: ${pacient.sexPacient}`);
        doc.text(30, 150, `Data nasterii: ${pacient.dataNasterii}`);
        doc.text(30, 170, `Ocupatia pacientului: ${pacient.ocupatie}`);
        doc.text(30, 210, `Subsemnatul ${pacient.nume} ${pacient.prenume} legitimat cu C.I cu CNP ${pacient.cnp} confirm ca am solicitat externarea`)
        doc.text(30, 220, `din motive personale. De asemenea, confirm ca am fost`);
        doc.text(30, 230, `informat de catre personalul medical asupra consecintelor posibile `);
        doc.text(30, 240, `ca urmare a intreruperii tratamentului si afirm ca imi mentin dorinta de a fi externat din spital.`);
        doc.text(30, 290, `Data curenta: ${currentDate.toLocaleDateString("en-US")}`);
        doc.setFont('Helvetica', 'Normal');
        doc.save(`cerere_externare_${pacient.nume}_${pacient.prenume}_${pacient.cnp}.pdf`);
        toast.success("Externare cu succes", { position: toast.POSITION.TOP_CENTER });
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="Nu" icon="pi pi-times" onClick={() => { setIsRequestTrue(false) }} className="p-button-text" />
                <Button label="Da" icon="pi pi-check" onClick={() => { externarePacient(pacient) }} autoFocus />
            </div>
        );
    }
    return (

        <div className="card">
            <Menubar model={items} />
            <Dialog header="Cerere de externare" visible={isRequestTrue} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => { setIsRequestTrue(false) }}>
                <p>În cazul oricărei urmări a externării, unitatea medicală este exclusă de orice acuzație. Sunteți sigur că vreți să efectuați această operațiune? Răspunsul este ireversibil
                </p>
            </Dialog>

        </div>

    )
}

export default ProfilPacient;