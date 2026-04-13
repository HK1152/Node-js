const posterModel = require('../models/posterModel');
const fs = require('fs');
const path = require('path');

const renderHome = async (req, res) => {
    try {
        const posters = await posterModel.find();
        res.render('home', { posters });
    } catch (err) {
        res.send('Error loading posters');
    }
};

const renderCreate = (req, res) => {
    res.render('create-edit', { poster: null });
};

const renderEdit = async (req, res) => {
    try {
        const poster = await posterModel.findById(req.params.id);
        if (!poster) return res.redirect('/home');
        res.render('create-edit', { poster });
    } catch (err) {
        res.redirect('/home');
    }
};

const createPoster = async (req, res) => {
    try {
        const { title, director, releaseYear, genre } = req.body;
        const posterImage = req.file ? req.file.filename : '';

        await posterModel.create({
            title, director, releaseYear, genre, posterImage
        });
        
        res.redirect('/home');
    } catch (err) {
        res.render('create-edit', { error: 'Failed to create', poster: null });
    }
};

const updatePoster = async (req, res) => {
    try {
        const { title, director, releaseYear, genre } = req.body;
        const updateData = { title, director, releaseYear, genre };

        if (req.file) {
            updateData.posterImage = req.file.filename;
            
            // Delete old background image logic (Optional but clean)
            const oldPoster = await posterModel.findById(req.params.id);
            if(oldPoster && oldPoster.posterImage) {
                const oldPath = path.join(__dirname, '../uploads', oldPoster.posterImage);
                if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

        await posterModel.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/home');
    } catch (err) {
        res.redirect('/home');
    }
};

const deletePoster = async (req, res) => {
    try {
        const poster = await posterModel.findByIdAndDelete(req.params.id);
        if(poster && poster.posterImage) {
            const oldPath = path.join(__dirname, '../uploads', poster.posterImage);
            if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        res.redirect('/home');
    } catch (err) {
        res.redirect('/home');
    }
};

module.exports = {
    renderHome,
    renderCreate,
    renderEdit,
    createPoster,
    updatePoster,
    deletePoster
};