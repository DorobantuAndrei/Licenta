import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import './AsistentaReview.css';
import Rate from "../../context/RatingStar/Rate";
import { toast, ToastContainer } from 'react-toastify';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';




function AsistentaReview() {
    const { idAsistenta } = useParams();
    const [asistenta, setAsistenta] = useState([]);
    const [rating, setRating] = useState(0);
    const [textArea, setTextArea] = useState("");
    const [val1, setVal1] = useState(0);
    const { idPacient } = useParams();


    useEffect(() => {

        Axios.get("http://localhost:8080/asistant/get_asistant_by_id/" + idAsistenta).then(response => {
            console.log(response.data);
            setAsistenta(response.data);
            setTextArea(`Spune-ne parerea ta despre ` + response.data.nume);
        })


    }, []);

    const handleRating = (rate) => {
        setRating(rate / 20)

    }

    const handleRecenzie = (event) => {
        setTextArea(event.target.value);
    }

    const trimitereRecenzie = () => {
        debugger;
        let recenzie = {
            idAsistenta: asistenta.id,
            idPacient: idPacient,
            textRecenzie: textArea,
            ratingAsistenta: val1,
            prenumeAsistenta: asistenta.prenume
        }
        console.log(recenzie);
        Axios.post("http://localhost:8080/recenzie/add", recenzie);
        toast.success("Recenzie adaugata cu succes", { position: toast.POSITION.TOP_CENTER });
    }

    return (
        // <div className="card">
        //     {asistenta && (
        //         <div class="card-container">
        //         <span class="pro">{asistenta.rating}</span>
        //         <img class="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
        //         <h3>{asistenta.prenume}</h3>
        //         <h6>{asistenta.nume}</h6>
        //         <div class="buttons">
        //             <Rating onClick={handleRating} ratingValue={rating} />
        //             <p>Rating - {rating}</p>
        //             <textarea placeholder={textArea} onChange={handleRecenzie}></textarea>
        //             <button class="primary ghost" onClick={()=>{trimitereRecenzie()}} >
        //                 Trimite-ne recenzie
        //             </button>

        //         </div>
        //         <div class="skills">
        //             <h6>Sectia</h6>
        //             <ul>
        //                <li>{asistenta.idSectie}</li>
        //             </ul>
        //         </div>
        //     </div>
        //     )}
        //     <ToastContainer/>
        // </div>
        <div className="main_container" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className="card" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <h1>{asistenta.nume} {asistenta.prenume}</h1>
                <Rating value={val1} onChange={(e) => setVal1(e.value)} stars={5} cancel={false} />
                <p>Rating acordat - {val1}</p>
                <InputTextarea rows={2} cols={25} onChange={handleRecenzie} autoResize />
                <Button label="Trimite recenzia" className="p-button-success margin-top-button" onClick={() => {trimitereRecenzie()}} />
                <ToastContainer />
            </div>
        </div>
    )

}

export default AsistentaReview;