const config = require('./config');
const bodyParser = require('body-parser');
const configureRoutes = require('./src/routes');
const configureResponses = require('./src/middlewares/response.middleware');
const { sequelize } = require('./src/sequelize');
const cors = require('cors')

const { app, server } = require('./src/sockets'); 

app.set('trust proxy', true);

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

configureResponses(app);
configureRoutes(app);

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful');
    } catch (error) {
        console.error('DB connection failed:', error);
        process.exit(1);
    }
};

(async () => {
    await connectDb();

    server.listen(config.PORT, () => {
        console.log('Server listening on port', config.PORT)
    });
})();
