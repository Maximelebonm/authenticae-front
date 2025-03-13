import { useEffect, useState } from 'react';
import { getCategoriesApi, addCategoryApi, updateCategoryApi, deleteCategoryApi } from '../../../../api/backEnd/admin.backend';


export const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState([]);
    const [modifyState, setModifyState] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategoriesApi();
            console.log(data)
            setCategories(data);
        };
        fetchData();
    }, []);

    const handleChange = (e, index, inputName) => {
        const newValue = e.target.value;
        const newCategoryLoading = [...categoryLoading];
        newCategoryLoading[index] = {
            ...newCategoryLoading[index],
            [inputName]: newValue
        };
        setCategoryLoading(newCategoryLoading);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const dataSend = { name: name };

        const fetch = async () => {
            const response = await addCategoryApi(dataSend);
            console.log(response);
        }
        fetch();
    }

    const handleSubmitUpdate = async (e, id_category) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const dataSend = { name: name, Id_categoryProduct: id_category };

        const fetch = async () => {
            const response = await updateCategoryApi(dataSend);
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

    const handleDelete = async (index) => {
        const fetch = async () => {
            const response = await deleteCategoryApi(categories[index].Id_categoryProduct);
            console.log(response);
        }
        fetch();
    }

    return (
        <div id='adminCategoryContainer'>
            <div id='adminCategoryContainer'>
                <div className='adminCategoryCard'>
                    <h2>Category List</h2>
                    <div className='adminCategoryList'>
                        {categories?.map((category, index) => (
                            <div key={index} className='adminCategoryItem'>
                                {modifyState[index] ? (
                                    <form onSubmit={(e) => handleSubmitUpdate(e, category.Id_categoryProduct)}>
                                        <input type='text' name='name' defaultValue={category.name} onChange={()=>handleChange}/>
                                        <button type='submit'>Submit</button>
                                        <button onClick={() => toggleModifyState(index)}>annuler</button>
                                    </form>
                                ) : (
                                    <div>
                                        <p>{category.name}</p>
                                        <button onClick={() => toggleModifyState(index)}>Modify</button>
                                        <button onClick={() => handleDelete(index)}>Supprimer</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='adminCategoryCard'>
                    <h2>Add Category</h2>
                    <form onSubmit={handleSubmit}>
                        <input type='text' name='name' placeholder='Category Name' />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};