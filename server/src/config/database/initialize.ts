import sequelize from './connection';

const initializeDatabase = async (): Promise<void> => {
    try {
        await sequelize.sync({ alter: true });

        console.log('Database connected successfully...');
    } catch (err: any) {
        console.error('Error initializing database');
        console.error(err.message);
        process.exit(1);
    }
};

export default initializeDatabase;
