import { useState, useEffect } from "react";
import { addTvaApi, getTvaApi, updateTvaApi, deleteTvaApi } from "../../../../api/backEnd/admin.backend";
import { Link } from "react-router-dom";

export const AdminTvaPanel = () => {
    const [tvaLoading, setTvaLoading] = useState([]);
    const [modifyState, setModifyState] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTvaApi();
            setTvaLoading(data);
        };
        fetchData();
    }, []);

    const handleChange = (e, index, inputName) => {
        const newValue = e.target.value;
        const newTvaLoading = [...tvaLoading];
        newTvaLoading[index] = {
            ...newTvaLoading[index],
            [inputName]: newValue
        };
        setTvaLoading(newTvaLoading);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const tva_rate = formData.get('tva_rate');
        const dataSend = { name: name, tva_rate: tva_rate };

        const fetch = async () => {
            const response = await addTvaApi(dataSend);
            console.log(response);
        }
        fetch();
    }

    const handleSubmitUpdate = async (e, id_tva) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const tva_rate = formData.get('tva_rate');
        const dataSend = { name: name, tva_rate: tva_rate, Id_tva: id_tva };

        const fetch = async () => {
            const response = await updateTvaApi(dataSend);
            console.log(response);
        }
        fetch();
    }

    const toggleModifyState = (index) => {
        setModifyState((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };


    const handledelete = (index) => {
        const fetch = async () => {
            const response = await deleteTvaApi(tvaLoading[index].Id_tva);
            console.log(response);
        }
        fetch();
    }
    
    return (
        <div>
            <Link to='/panelAdmin/'><div>retour</div></Link>
            <h1>Admin TVA Panel</h1>
            {tvaLoading?.map((item, index) => {
                return (
                    <div key={index}>
                        {!modifyState[index] ?
                            <div>
                                <div>{item.name}</div>
                                <div>{item.tva_rate}</div>
                                <button type="button" onClick={() => handledelete(index)}>supprimer</button>
                                <button onClick={() => toggleModifyState(index)}> Modifier</button>
                            </div>
                            :
                            <form onSubmit={(e) => handleSubmitUpdate(e, item.Id_tva)}>
                                <label>TVA Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    value={item.name}
                                    onChange={(e) => handleChange(e, index, 'name')}
                                    placeholder="TVA"
                                />
                                <label>TVA Rate</label>
                                <input
                                    type="number"
                                    name='tva_rate'
                                    value={item.tva_rate}
                                    onChange={(e) => handleChange(e, index, 'tva_rate')}
                                    placeholder="TVA"
                                />
                                <button type="submit">Valider</button>
                                <button type="button" onClick={() => toggleModifyState(index)}>annuler</button>
                                <button type="button" onClick={() => handledelete(index)}>supprimer</button>
                            </form>
                        }
                    </div>
                )
            })}
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>TVA Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                />
                <label>TVA Rate</label>
                <input
                    type="number"
                    name="tva_rate"
                    placeholder="Pourcentage"
                />
                <button type="submit">Valider</button>
            </form>
        </div>
    );
}