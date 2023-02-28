import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser';
import router from './Routes/route.js'
import './handlers/cloudinary.js'


const port = 8000;

const app = express();
app.use(express.json({limit:'10mb'}))
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')

app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false, parameterLimit: 100000 }));
app.get('/', (req, res) => {
    res.send("Home Get request")
})
app.use('/', router)

const server = app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
server.timeout = 300000;