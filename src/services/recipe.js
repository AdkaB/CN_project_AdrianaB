//access to all recipes

async function getAllRecipes (req, res) {
    try{
        const recipes = await req.context.models.recipe.findAll({
            include: [{model: req.context.models.ingredient}] 
        })
        res.send(recipes)
    } catch(error) { 
        req.log.error(error)
        res.sendStatus(500)
    }
}

//access to filtered recipes

async function getFilteredRecipes (req, res) {
    try{
    const validationResults = validationResult()
    if (validationResult.isEmpty()) {
    const filteredRecipes = await req.context.models.recipe.findAll({
        where: {title: req.params.title},
        include: [{model: req.context.models.ingredient}]
    })
     res.send(filteredRecipes)
        } else {
        req.log.info(`validation error value: ${req.params.title}`)    
        res.status(400)
        res.send('validationError')
        }
    } catch (error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}

//creating new recipe

async function addRecipe (req, res) {
    try{
        const newRecipe = await req.context.models.recipe.create({
            title: req.body.title,
            text: req.body.text
        })
        res.send(newRecipe)
    }
    catch (error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}


//deleting the recipe

async function deleteRecipe (req, res) {
    try{
        const id = req.params.id;
        const deletedRecipe = await req.context.models.recipe.destroy({
            where: { id: id }
        }
        )
        if (deletedRecipe == 1) {
            res.send(`Recipe no. ${id} was succesfully deleted.`)
        } else {
            res.send(`Recipe no. ${id} could not be deleted. Check if it wasn't already deleted.`)
        } 
    }
    catch (error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}


//edditing the existing recipe

async function editRecipe (req, res) {
    try{
        const id = req.params.id;
        const updatedRecipe = await req.context.models.recipe.update(req.body, {
            where: { id: id }
        }
        )
        if (updatedRecipe == 1) {
            res.send(`Recipe no. ${id} was succesfully updated!`)
        } else {
            res.send(`Recipe no. ${id} could not be updated! Check if recipe no. ${id} exists.`)
        }
    }
    catch (error) {
        req.log.error(error)
        res.sendStatus(500)
    }
}

export default { getAllRecipes, getFilteredRecipes, addRecipe,  editRecipe, deleteRecipe}
