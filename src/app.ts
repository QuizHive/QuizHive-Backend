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

import express from "express";
import userRoutes from './routes/userRoutes';
// import questionRoutes from './routes/questionRoutes';
// import categoryRoutes from './routes/categoryRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base route
app.get('/', (req, res) => {
    res.send('Welcome to QuizHive API!');
});

// Routes
app.use('/api/user', userRoutes);
// app.use('/api/questions', questionRoutes);
// app.use('/api/categories', categoryRoutes);

export default app;