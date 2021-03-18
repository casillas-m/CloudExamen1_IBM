const router = require('express').Router();

router.route("/autor").get((req,res)=>{
    res.json({
        alumno: "MCR",
        servicio: "Cloud Foundry en IBM Cloud"
    })
})

module.exports = router;