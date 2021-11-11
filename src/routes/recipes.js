import bodyParser from "body-parser"
import express from "express"
import {param, validationResult} from "express-validator"

import services from "../services"
import ingredients from "../services/ingredients"
import recipe from "../services/recipe"


const router = express.Router()

router.get('/', services.recipes.getAllRecipes);

router.get('/:title', param('title').isLength({min: 2, max:50}), services.recipes.getFilteredRecipes);

router.post ('/', services.recipes.addRecipe);

router.delete('/:id', param('id').isLength({min: 1, max: 50}), services.recipes.deleteRecipe)

router.put('/:id', param('id').isLength({min: 1, max: 50}), services.recipes.editRecipe);

export default router