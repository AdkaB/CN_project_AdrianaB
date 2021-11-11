import express from "express"
import {param, validationResult} from 'express-validator'

import services from "../services"


const router = express.Router()


router.get('/', services.ingredients.getAllIngredients);

router.get('/:id',param('id').isInt(), services.ingredients.getFilteredIngredients);

router.post('/', services.ingredients.addIngredient);

router.delete('/:id', param('id').isLength({min: 1, max: 50}), services.ingredients.deleteIngredient);

router.put('/:id', param('id').isLength({min: 1, max: 50}), services.ingredients.ediIngredient)

export default router
