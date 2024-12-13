// import express from "express";

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
// // app.use(passport.initialize());
// // passport.use('jwt', jwtStrategy);

// export default app;




// ------------- for user:

// import express from "express";
// import userRoutes from './routes/userRoutes';
// // import questionRoutes from './routes/questionRoutes';
// // import categoryRoutes from './routes/categoryRoutes';

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.send('Welcome to QuizHive API!');
// });

// app.use('/api/user', userRoutes);
// // app.use('/api/questions', questionRoutes);
// // app.use('/api/categories', categoryRoutes);

// export default app;


// ------ for category and question
import express from 'express';
import questionRoutes from './routes/questionRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to QuizHive API');
});

app.use('/api/question', questionRoutes);
app.use('/api/category', categoryRoutes);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send({ message: 'An internal error occurred', error: err.message });
});

export default app;