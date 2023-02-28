import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser';
import router from './Routes/route.js'
import './handlers/cloudinary.js'


const port = 8000;

const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Home Get request")
})
app.use('/',router)


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});