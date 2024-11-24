const configureRoutes = (app) => {
    app.use('/api/users', require('./api/user.routes'));
    app.use('/api/projects', require('./api/project.routes'));
    app.use('/api', (req, res) => {
        res.status(200).send('Hello World!');
    });
};
  
module.exports = configureRoutes;
  