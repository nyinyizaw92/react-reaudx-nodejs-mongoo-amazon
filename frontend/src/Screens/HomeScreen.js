import React,{useState, useEffect} from 'react';
import data from '../data';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {listProducts} from '../actions/productActions'

function HomeScreen(props){
    //use react-redux
     const productList = useSelector(state => state.productList);
     console.log(productList);
     const { products,loading,error } = productList;
     console.log(products);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listProducts());
        return()=>{

        }
    },[])
    //const [products,setProduct] = useState([]);  react only using hook
    // useEffect(()=>{
    //     const fetchData = async()=>{
    //         const {data} = await axios.get("/api/products");
    //         console.log(data);
    //         setProduct(data);
    //     }
    //    fetchData();
    //     return()=>{

    //     }
    // },[])
    return(
        loading ? <div>loading...</div> :
        error ? <div>{error}</div> :
        <ul className="products">
        {
          products.map(product => 
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}> 
                    <img className="product-image" src={product.image} alt="shirt" />
                </Link>
                <div className="product-name">
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">{product.price}</div>
                <div className="product-rating">
                    {product.rating} Stars ({product.numReviews} Reviews)
                </div>
              </div>
            </li>
          )
        }
    </ul>
    )
}

export default HomeScreen;