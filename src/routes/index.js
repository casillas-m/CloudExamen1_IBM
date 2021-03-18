const router = require('express').Router();

//IBM Tone Analyzer
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
      apikey: process.env.API_KEY_CF,
    }),
    serviceUrl: process.env.URL_CF,
});

router.route("/autor").get((req,res)=>{
    res.json({
        alumno: "MCR",
        servicio: "Cloud Foundry en IBM Cloud"
    })
})

router.route("/").post((req,res)=>{
    if (req.body.texto){
        let texto = req.body.texto
        console.log('-----------Texto recibido-----------');
        console.log(texto);
        console.log('------------------------------------');

        const toneParams = {
        toneInput: { 'text': texto },
        contentType: 'application/json',
        };

        toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            //console.log(JSON.stringify(toneAnalysis, null, 2));
            res.json(toneAnalysis.result.document_tone.tones)
        })
        .catch(err => {
            console.log('error:', err);
            res.status(500).json(err)
        });
    }else{
        res.status(400).json({
            error: "Falta prámtero 'texto' en el cuerpo de la solicitud"
        })
    }
    
})

module.exports = router;