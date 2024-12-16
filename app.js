const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour vérifier les heures de travail
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0: dimanche, 1: lundi, ..., 6: samedi
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); 
    } else {
        res.send(`<h1>Hors heures de travail</h1><p>Le site est disponible du lundi au vendredi, de 9h à 17h.</p>`);
    }
};


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

// le middleware 
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Accueil' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Nos services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Nous contacter' });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
