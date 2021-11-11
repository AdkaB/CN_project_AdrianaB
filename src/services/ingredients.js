//access to all ingredients

async function getAllIngredients (req, res) {
    try{
    const recipes = await req.context.models.ingredient.findAll({
    })
     res.send(recipes)
    } catch (error) {
        console.log('error', error)
        res.sendStatus(500)
    }
}

//access to filtered ingredients

async function getFilteredIngredients (req, res) {
    try{
    const validationResults = validationResult(req)
    if (validationResults.isEmpty()) {
    const filteredRecipes = await req.context.models.ingredient.findAll({
        where: {id: req.params.id},
    })
     res.send(filteredRecipes)
        } else {
        res.status(400)
        res.send('validationError')
        }
    } catch (error) {
        console.log('error', error)
        res.sendStatus(500)
    }
}


//creating new ingredient

async function addIngredient (req, res) {
    try{
    const addNewIngredient = await req.context.models.ingredient.create({
        title: req.body.title,
        unit: req.body.unit
    })
        res.send(addNewIngredient)
    }
    catch (error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}


//deleting the ingredient

async function deleteIngredient (req, res) {
    try{
        const id = req.params.id;
        const deletedIngredient = await req.context.models.ingredient.destroy({
            where: { id: id }
        }
        )
        if (deletedIngredient == 1) {
            res.send(`Ingredient no. ${id} was succesfully deleted.`)
        } else {
            res.send(`Ingredient no. ${id} could not be deleted. Check if it wasn't already deleted.`)
        }
    }
    catch (error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}


//edditing the existing ingredient

async function ediIngredient (req, res) {
    try{
        const id = req.params.id;
        const updatedIngredient = await req.context.models.ingredient.update(req.body, {
            where: { id: id }
        }
        )
        if (updatedIngredient == 1) {
            res.send(`Ingredient no. ${id} was succesfully updated!`)
        } else {
            res.send(`Ingredient no. ${id} could not be updated! Check if ingredient no. ${id} exists.`)
        }
    }
    catch (error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}

export default {getAllIngredients, getFilteredIngredients, addIngredient, deleteIngredient, ediIngredient}