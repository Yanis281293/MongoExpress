const mongoose = require("mongoose");
require("dotenv").config();

// Configuration de la connexion à la base de données en utilisant les variables d'environement
const MONGODB_URI = process.env.MONGODB_URI;

// Connexion a la base de données
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`, {
            useNewUrlParser: true, // Pour utiliser le nouveau parser de l'URL

            useUnifiedTopology: true, // Pour utiliser le moteur de surveillance du serveur et éviter les avertissements de dépréciation
        });
        console.log("La connexion à la base de données est établie avec succès");
    }
    catch (err) {
        console.error("Impossible de se connecter à la basse de données", err);
    }
}

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("La connexion à la base de données est fermée avec succès");
    }
    catch (err) {
        console.error("Impossible de fermer la connexion à la base de données", err);
    }
}

// Initialisation de la base de données
const initDB = async () => {
    await connectDB();
};

module.exports = { initDB, connectDB, disconnectDB };