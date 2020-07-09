import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts,deleteProduct } from '../actions/productActions';

function ProductsScreen(props){

    const [modelVisible,setModelVisible] = useState(false);
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState('');
    const [brand,setBrand] = useState('');
    const [category,setCategory] = useState('');
    const [countInStock,setCountInStock] = useState('');
    const [description,setDescription] = useState('');

    const productList = useSelector(state => state.productList);
     console.log(productList);
     const { products,loading,error } = productList;

     const productDelete = useSelector(state=>state.productDelete);
     const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete;
  
    const productSave = useSelector(state=>state.productSave);
    const {product,loading:loadingSave,error:errorSave,success:successSave} = productSave;

    const dispatch = useDispatch();
    useEffect(()=>{
        if(successSave){
            setModelVisible(false)
        }
        dispatch(listProducts());
        return()=>{

        }
    },[successSave,successDelete]);

    const openModel = (product)=>{
        setModelVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(product.category);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setDescription(product.description);
     
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        
        dispatch(saveProduct({_id:id,name,price,image,brand,category,countInStock,description}));
    }

    const deleteHandler = (product) =>{
        dispatch(deleteProduct(product._id));
    }

    return <div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={()=>openModel({})}>Create product</button>
        </div>
        {
            modelVisible && 
            <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h3>Create product</h3>
                    </li>
                    <li>
                        {loadingSave && <div>Loading....</div>}
                        {errorSave && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" value={name}
                         id="name" onChange={(e)=>setName(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Price
                        </label>
                        <input type="text" name="price" value={price}
                        id="price" onChange={(e)=>setPrice(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Image
                        </label>
                        <input type="text" name="image" value={image} 
                        id="image" onChange={(e)=>setImage(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="name">
                            brand
                        </label>
                        <input type="text" name="brand" value={brand}
                        id="brand" onChange={(e)=>setBrand(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Category
                        </label>
                        <input type="text" name="category" value={category}
                         id="category" onChange={(e)=>setCategory(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="name">
                            countInStock
                        </label>
                        <input type="text" name="countinstock" value={countInStock}
                         id="countinstock" onChange={(e)=>setCountInStock(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Description
                        </label>
                        <textarea name="description" id="description" value={description}
                         onChange={(e)=>setDescription(e.target.value)}>
                        </textarea>
                    </li>
                    
                    <li>
                        <button type="submit" className="button primary">{id ? "update":"Create Product"}</button>
                    </li>
                    <li>
                        <button type="submit" onClick={()=>setModelVisible(false)} className="button secondary">Cancle</button>
                    </li>

                    
                </ul>
            </form>
        </div>
        }

        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button className="button" onClick={()=>openModel(product)}>Edit</button>
                                <button className="button" onClick={()=>deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    
   
}

export default ProductsScreen;