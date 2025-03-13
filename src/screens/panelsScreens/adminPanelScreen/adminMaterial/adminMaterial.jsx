import { useEffect, useState } from 'react';
import { getMaterialsApi, addMaterialApi, updateMaterialApi, deleteMaterialApi } from '../../../../api/backEnd/admin.backend';
import { toast, ToastContainer } from 'react-toastify';

export const AdminMaterial = () => {
    const [materialLoading, setMaterialLoading] = useState([]);
    const [modifyState, setModifyState] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMaterialsApi();
            setMaterialLoading(data);
        };
        fetchData();
    }, []);

    const handleChange = (e, index, inputName) => {
        const newValue = e.target.value;
        const newMaterialLoading = [...materialLoading];
        newMaterialLoading[index] = {
            ...newMaterialLoading[index],
            [inputName]: newValue
        };
        setMaterialLoading(newMaterialLoading);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const dataSend = { name: name };

        const fetch = async () => {
            const response = await addMaterialApi(dataSend);
            console.log(response);
        }
        fetch();
    }

    const handleSubmitUpdate = async (e, id_material) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const dataSend = { name: name, Id_material: id_material };

        const fetch = async () => {
            const response = await updateMaterialApi(dataSend);
            console.log(response);
        }
        fetch();
    }

    const handleDelete = async (id) => {
        const response = await deleteMaterialApi(id);
        if(response != 'error'){
            toast.success('Material updated',{autoClose : 2000})
        }
    }

    const toggleModifyState = (index) => {
        setModifyState((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div>
        <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='name' />
                <button type='submit'>Create</button>
            </form>
            {
                materialLoading?.map((item, index) => {
                    return (
                        <div key={index}>
                            {modifyState[index] ?
                                <form onSubmit={(e) => handleSubmitUpdate(e, item.Id_material)}>
                                    <input type='text' name='name' defaultValue={item.name} />
                                    <button type='submit'>update</button>
                                    <button type='button' onClick={() => toggleModifyState(index)}>cancel</button>
                                </form>
                                :
                                <div>
                                    {item.name}
                                    <button onClick={() => toggleModifyState(index)}>modify</button>
                                    <button onClick={() => handleDelete(index)}>delete</button>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}