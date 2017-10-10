var express = require('express');
var router = express.Router();

// habilitar CORS
router.all('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next()
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Tareas = mongoose.model('Tareas');

//GET listar tareas
router.get('/tareas', function(req,res,next){
	Tareas.find(function(err, tareas){
		if(err){return next(err)}

		//res.json(tareas);
		res.status(200).send(tareas);

	})
})

// POST  agregar tarea
router.post('/tarea',function(req,res,next){
/*
	var tarea = new Tareas(res.body);
	tarea.save(function(err,tarea){
		if(err){return next(err)}
		res.json(tarea);
	})
*/
	console.log('POST api/product',req.body);
	let tarea = new Tareas()
	tarea.nombre = req.body.nombre
	tarea.prioridad = req.body.prioridad

	tarea.save((err, tareaStored)=>{
		if(err) res.status(500).send({message: `Error al salvar en la BD: ${err}`})
		res.status(200).send(tareaStored);
	})
})


// PUT actualizar tarea

router.put('/tarea/:id',function(req,res,next){
	let tareaId = req.params.id;
	let updateTarea = req.body;
	Tareas.findByIdAndUpdate(tareaId,updateTarea,(err,tareaUpdate)=>{
		if(err) return res.status(500).send({message: `Error al actualizar producto: ${err}`})
		res.status(200).send(tareaUpdate);
	})
})


// DETELE eliminar tarea
router.delete('/tarea/:id',function(req,res,next){
	let id = req.params.id;
	Tareas.findByIdAndRemove(id,(err)=>{
		if(err) return res.status(500).send({message: `Error al elminar producto: ${err}`})
		res.status(200).send({message: 'Se ha eliminado con exito'});
	})
})





module.exports = router;
