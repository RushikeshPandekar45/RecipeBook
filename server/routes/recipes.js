const { Router } = require('express');
const fetchuser=require('../middelware/fetchuser')
const Recipe=require('../models/Recipe');
const { body, validationResult } = require('express-validator');
const router=Router();

router.post('/addrecipe',fetchuser,[
    body('title',"Title Sould be of minimum 5 characters").isLength({min:4}),
    body('ingredients',"There Should be atleast 3 ingredients").isLength({min:3}),
    body('procedure',"Title Sould be of minimum 50 characters").isLength({min:45}),
    body('imageUrl',"Enter Valid Image URL").isURL(),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userId=req.user.id;
        const username=req.user.name;
        const {title,ingredients,procedure,imageUrl}=req.body;
        const recipe=await Recipe.create({username,userId,title,ingredients,procedure,imageUrl});
        res.json(recipe);
    } catch (err) {
        res.status(404).send("Some Internal Server Error Occured");
    }
});

router.get('/getallrecipes',async(req,res)=>{
    try {
        const recipes=await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(404).send("Some Internal Server Error Occured");
    }
});

router.get('/getyourrecipes',fetchuser,async(req,res)=>{
    try {
        const recipes=await Recipe.find({userId:req.user.id});
        res.json(recipes);
    } catch (error) {
        res.status(404).send("Some Internal Server Error Occured");
    }
});
router.delete('/deleterecipe/:id',fetchuser,async(req,res)=>{
    try {
        const recipe=await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).send("Recipe not found");
        }
        if(recipe.userId.toString() != req.user.id){
            return res.status(401).send("Access Denied");
        }
        const deletedRecipe=await Recipe.findByIdAndDelete(req.params.id);
        res.json({success:"Recipe Deleted Successfully",deletedRecipe});
    } catch (err) {
        console.log(err.message);
        res.status(404).send("Some Internal Server Error Occured");
    }
});
router.put('/updaterecipe/:id',fetchuser,[
    body('title',"Title Sould be of minimum 5 characters").isLength({min:4}),
    body('ingredients',"There Should be atleast 3 ingredients").isLength({min:3}),
    body('procedure',"Title Sould be of minimum 50 characters").isLength({min:45}),
    body('imageUrl',"Enter Valid Image URL").isURL(),
],async(req,res)=>{
    try {
        let {title,ingredients,procedure,imageUrl}=req.body;
        let newnote={}
        if(title) newnote.title = title
        if(ingredients) newnote.ingredients = ingredients
        if(procedure) newnote.procedure = procedure
        if(imageUrl) newnote.imageUrl = imageUrl

        const recipe=await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).send("Recipe not found");
        }
        if(recipe.userId.toString() != req.user.id){
            return res.status(401).send("Access Denied");
        }
        const newRecipe=await Recipe.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        res.json(newRecipe);
    } catch (err) {
        console.log(err.message);
        res.status(404).send("Some Internal Server Error Occured");
    }
});
module.exports=router;