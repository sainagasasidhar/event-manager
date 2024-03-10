import express from 'express';
import router from './routes'
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',router);

app.listen(port, () => {
    console.log(`Server is listing on port ${port}`);
});

