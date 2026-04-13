const router = require('express').Router();
const { 
    renderHome, 
    renderCreate, 
    renderEdit, 
    createPoster, 
    updatePoster, 
    deletePoster 
} = require('../controller/posters-CRUD');
const upload = require('../utils/Multer');

// Page Renders
router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', renderHome);
router.get('/create', renderCreate);
router.get('/edit/:id', renderEdit);

// Form / API Actions
router.post('/create', upload.single('posterImage'), createPoster);
router.post('/update/:id', upload.single('posterImage'), updatePoster);
router.post('/delete/:id', deletePoster);

module.exports = router;
