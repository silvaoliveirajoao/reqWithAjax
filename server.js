const bodyParser = require ('body-parser')
const express = require('express')
const app = express()

// middleware é uma função que vai ser executada quando uma determinada requisição chegar
app.use(express.static('.'))
// se vier um formato submit de um formulário, esse código é responsável por ler os dados e transformar em objeto
app.use(bodyParser.urlencoded({ extended: true }))
// se vier um json dentro do body da requisição, esse é comando que vai ser aplicado para transformar o json em objeto
app.use(bodyParser.json())

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage }).single('arquivo')

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluído com sucesso.')
    })
})

app.post('/formulario', (req, res) => {
    res.send({
        ...req.body,
        id: 7
    })
})

app.get('/parOuImpar', (req, res) => {
    // req.body
    // req.query
    // req.params
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

// Isso também é uma função middleware, que vai ser invocada apartir de uma requisição do tipo get
app.listen(8081, () => console.log('Executando...'))

