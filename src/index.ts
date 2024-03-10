import express from 'express';
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is listing on port ${port}`);
});