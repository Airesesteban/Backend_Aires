import {dbProductManager} from "../dao/managers/dbProductManager.js";

const productManager = new dbProductManager();

async function getProducts(req, res)  {
   
    try {
        const products = await productManager.getProducts();
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }

    async function getProductById (req, res){

        const {pid} = req.params;
        try{
            const product = await productManager.getProductById(pid)
            res.send({
                status: "success",
                message: product
            })
        }catch(error){
            console.error("Error al obtener producto",error)
        }
    }

    async function addProduct (req, res) {

        const newProduct = req.body;
       
        try{
            const result = await productManager.addProduct(newProduct);
    
            res.send({
                status: "success",
                message: result
            })
        }catch(error){
            console.error("Error al agregar producto".error)
        }
        
    }

    async function updateProduct (req, res) {

        const {pid} = req.params;
        const updateProduct = req.body;
        try{   
            const result = await productManager.updateProduct(pid,updateProduct);
            res.send({
                status: "success",
                message: result
            })
        } catch(error){
            console.error("Error al actualizar productor".error)
        }
        
    }

    async function deleteProduct (req, res) {

        const {pid} = req.params;
    
        try{
            const result = await productManager.deleteProduct(pid)
    
            res.send({
                status: "success",
                message: result
            })
        }catch(error){
            console.error("Error al eliminar productor".error)
        }
     
    }

    export {
        getProducts,   
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct
    };