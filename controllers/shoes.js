import express from 'express';
import Shoe from '../models/shoe.js';
//test
//creating router object
const router = express.Router();

//get 1
/**
 * @swagger
 * /api/v1/shoes:
 *   get:
 *     summary: Retrieve all shoes
 *     responses:
 *       200:
 *         description: A list of shoes
 */
router.get('/', async (req,res)=>{
    let shoes = await Shoe.find(); //uses the shoe model to get all the shoes in the shoe collection

    if(!shoes){
        return res.status(404).json({err: 'no results'})
    }
    return res.status(200).json(shoes);
});

/**
 * @swagger
 * /api/v1/shoes/{id}:
 *   get:
 *     summary: Find a shoe by its id
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Returns a single shoe
 *       404:
 *         description: Not found
 */

//get 2
router.get('/:id', async(req,res)=>{
    let shoe = await Shoe.findById(req.params.id);

    if(!shoe){
        return res.status(404).json({msg: 'Not found'});
    }
    return res.status(200).json(shoe);
});

/**
 * @swagger
 * /api/v1/shoes:
 *   post:
 *     summary: Add a new shoe from POST body
 *     description: Add a shoe to the collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               stores:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     address:
 *                       type: string
 *                     stock:
 *                       type: number
 *     responses:
 *       201:
 *         description: Resource created
 *       400:
 *         description: Bad request
 */

//post
router.post('/', async(req,res)=>{
    try{

        const {name,price, category, manufacturer, stores} = req.body;

        //validate the stores data
        if (!name || !price || !manufacturer || stores === undefined || stores.length === 0) {
            return res.status(400).json({ err: 'Missing required fields' });
        }

        for (const store of stores) {
            if (!store.name || !store.address || !store.stock) {
                return res.status(400).json({ err: 'Invalid store data' });
            }
        }
        

        const newShoe = await Shoe.create(req.body);
        return res.status(201).json(newShoe);
    }
    catch(err){
        return res.status(400).json({err: `Bad request: ${err}`})
    }
});

/**
 * @swagger
 * /api/v1/shoes/{id}:
 *   put:
 *     summary: Update selected shoe from request body
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique ID of the shoe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               stores:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     address:
 *                       type: string
 *                     stock:
 *                       type: number
 *     responses:
 *       200:
 *         description: Resource updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */

//put
router.put('/:id', async (req,res)=>{
    try{
        let shoe = await Shoe.findById(req.params.id);

        if(!shoe){
            return res.status(404).json({msg: "Not found"});
        }

        const { name, price, category, manufacturer, stores } = req.body;
        if (!name || !price || !manufacturer || stores === undefined || stores.length === 0) {
            return res.status(400).json({ err: 'Missing required fields' });
        }

        // Validate stores array
        for (const store of stores) {
            if (!store.name || !store.address || !store.stock) {
                return res.status(400).json({ err: 'Invalid store data' });
            }
        }

        if(req.params.id != req.body._id){
            return res.status(400).json({msg: 'Bad request: _ids do not match'});
        }
        shoe.set(req.body);
        await shoe.save();
        
        return res.status(204).json();
    }
    catch(err){
        return res.status(400).json({err:`Bad request: ${err}`})
    }
});


/**
 * @swagger
 * /api/v1/shoes/{id}:
 *   delete:
 *     summary: Remove selected shoe
 *     parameters: 
 *       - name: id
 *         in: path
 *         schema: 
 *           type: string
 *           required: true
 *     responses:
 *       204:
 *         description: Resource updated (removed)
 *       404:
 *         description: Not found
 *     
 */
//delete
router.delete('/:id', async (req,res)=>{
    let shoe = await Shoe.findById(req.params.id);

    if(!shoe){
        return res.status(404).json({msg: "not found"});
    }

    await Shoe.findByIdAndDelete(req.params.id);
    return res.status(204).json()
})

//make controller public to the rest of the app
export default router;

