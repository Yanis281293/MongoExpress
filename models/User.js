const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Le nom d\'utilisateur doit comporter au moins 5 caractères.'],
        maxlength: [30, 'Le nom d\'utilisateur ne doit pas dépasser 30 caractères.']
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Le mot de passe doit comporter au moins 8 caractères.']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/\S+@\S+\.\S+/, 'L\'email est invalide.'] // Regex pour valider le format de l'email
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'Le rôle est invalide.'
        },
        default: 'user'
    }
});

// Intégration de passport-local-mongoose qui sert à gérer les utilisateurs
UserSchema.plugin(passportLocalMongoose);

// Création du modèle User basé sur le schéma défini précédemment
const User = mongoose.model('User', UserSchema);

// Exportation du modèle User pour l'utiliser dans d'autres fichiers
module.exports = User;