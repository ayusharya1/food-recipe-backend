const RecipeModel = require("../models/recipe")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })
const getRecipes=async(req,res)=>{
    const recipes=await RecipeModel.find()
    // console.log(recipes.data);
    return res.json(recipes)
    
}
const getRecipe=async(req,res)=>{
    const id=req.params.id;
    const recipe=await RecipeModel.findById({_id:id})
    return res.json(recipe)
}
const addRecipe=async(req,res)=>{
    console.log(req.user);
   try {
    const { title, ingredients, instructions, time } = req.body;
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        success: false,
        message: "Required fields can't be empty"
      });
    }

    const newRecipe = await RecipeModel.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file?.filename,
      createdBy:req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "New recipe added",
      data: newRecipe
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
const editRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;
    const id = req.params.id;
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "No such Recipe present"
      });
    }
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        success: false,
        message: "Required fields can't be empty"
      });
    }
    let checkImage=(!req.file?.filename) ? recipe.coverImage: req.file?.filename 
    let updatedRecipe=await RecipeModel.findByIdAndUpdate(id, {...req.body,coverImage:checkImage}, { new: true });
    return res.json({
      success: true,
      message: "Recipe edited",
      updatedRecipe
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
};

const deleteRecipe=async(req,res)=>{
    try {
      let id=req.params.id
    await RecipeModel.deleteOne({_id:id})
    res.json({status:"ok"})
    } catch (error) {
      res.status(400).json({
        message:"error"
      })
    }
}
module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}
