import sequelize from '../config/sequelize';

const initDb = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully...');
    } catch (err: any) {
        console.error('Error initializing database');
        console.error(err.message);
        process.exit(1);
    }
};

export default initDb;
