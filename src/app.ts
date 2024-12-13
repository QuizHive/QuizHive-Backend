import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

export default app;