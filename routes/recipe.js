const express=require("express")
const { getRecipes, addRecipe, editRecipe, deleteRecipe, getRecipe,upload } = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router=express.Router()
router.get("/",getRecipes)//get all recipes
router.get("/:id",getRecipe)//get recipe by id
router.post('/',upload.single('coverImage'),verifyToken,addRecipe);//to add new recipe
router.put("/:id",upload.single('coverImage'),editRecipe)//to edit a Recipe
router.delete("/:id",deleteRecipe)//delete Recipe
module.exports=router
