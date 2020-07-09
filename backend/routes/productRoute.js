import express from 'express';
import Product from '../model/productModel';
import {isAuth,isAdmin} from '../util';

const router = express.Router();

router.get('/',async(req,res)=>{
    const products = await Product.find({});

    res.send(products);
});

router.get('/:id',async(req,res)=>{
    const product= await Product.findOne({_id:req.params.id});
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:'page not found'})
    }
})

router.post('/',isAuth,isAdmin,async(req,res)=>{
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        description:req.body.description,
    });

    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({
            msg:'new product create',
            data:newProduct
        })
    }else{
        return res.status(500).send({
            msg:'error in creating product'
        })
    }
    
})

router.put('/:id',isAuth,isAdmin,async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if(product){
        product.name = req.body.name,
        product.image=req.body.image,
        product.brand=req.body.brand,
        product.price=req.body.price,
        product.category=req.body.category,
        product.countInStock=req.body.countInStock,
        product.description=req.body.description

        const updateProduct = await product.save();
        if(updateProduct){
            return res.status(200).send({
                msg:'update product success',
                data:updateProduct
            })
        }else{
            return res.status(500).send({
                msg:'error in updating product'
            })
        }
    }
   
    
})

router.delete('/:id',isAuth,isAdmin,async(req,res)=>{
    const deleteProduct = await Product.findById(req.params.id);
    if(deleteProduct){
        await deleteProduct.remove();
        res.send({message:"product delete"});
    }else{
        res.send("error in delete ")
    }
})

export default router;