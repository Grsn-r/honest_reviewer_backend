import mongoose from 'mongoose';

async function connectMongoDb() {
    const intentos = 5;
    const tiempo = 3000;
    try {
        for(let intento = 1 ; intento <= intentos ; intento++)
        await mongoose.connect(process.env.MONGO_URI);
        console.log('conectado a MongoDB');
        return;
    } catch (error) {
        console.log(`Error intento ${intento} fallido`, error.message);
        if (intento === intentos) {
            throw new Error('Error, no se pudo conectar a la base de datos');
        }
        await Promise(resolve => setTimeout(resolve, tiempo));
    }
};

export default connectMongoDb;