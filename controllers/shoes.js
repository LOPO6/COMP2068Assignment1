import express from 'express';
import Shoe from '../models/shoe.js';

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
    let shoes = await Shoe.find; //uses the shoe model to get all the shoes in the shoe collection

    if(!shoes){
        return res.status(404).json({err: 'not found'})
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
 *           type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: Returns a single shoe
 *       404:
 *         description: Not found
 */
//get 2
router.get('/:id', async(req,res)=>{
    let shoe = await Shoe.find();

    if(!shoe){
        return res.status(404).json({msg: 'Not found'});
    }
    return res.status(200).json(shoe);
});

/**
 * @swagger
 * /api/v1/shoes:
 *   post:
 *     summarry: add new cheese from POST body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource created
 *       400:
 *         description: bad request
 * 
 */


//post
router.post('/', async(req,res)=>{
    try{
        await Shoe.create(req.body);
        return res.status(201).json();
    }
    catch(err){
        return res.status(400).json({err: `Bad request: ${err}`})
    }
});

/**
 * @swagger
 * /api/v1/shoes/{id}:
 *   put:
 *     summary: update selected shoe from request body
 *     parameters:
 *       -name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: true
 *     requestBody:
 *       required: true
 *       content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *     responses:
 *       204:
 *         description: Resource updated
 *       400:
 *         description: bad request
 *       404:
 *         deacription: not found
 */

//put
router.put('/:id', async (req,res)=>{
    try{
        let shoe = await Shoe.findById(req.params.id);

        if(!cheese){
            return res.status(404).json({msg: "Not found"});
        }
        if(req.params.id != req.body._id){
            return res.status(400).json({msg: 'Bad request: _ids do not match'});
        }
        await cheese.update(req.body);
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
 *           type: integer
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

