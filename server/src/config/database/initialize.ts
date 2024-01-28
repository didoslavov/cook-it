import sequelize from './connection';

export default async (): Promise<void> => {
    try {
        await sequelize.sync();

        console.log('Database connected successfully...');
    } catch (err: any) {
        console.error('Error initializing database');
        console.error(err.message);
        process.exit(1);
    }
};
