const express = require("express");
const router = express.Router();
const exjwt = require("express-jwt");
const patientsController = require('../controllers/patients');
const vaccinationsController = require('../controllers/vaccinations');
const vaccinesController = require('../controllers/vaccines');
const usersController = require('../controllers/users');
const analyticsController = require('../controllers/analytics');

const jwtMW = exjwt({ secret: process.env.IMMSECRETKEY });

router.get('/patients', jwtMW, patientsController.all);
router.get('/patient/:id', jwtMW, patientsController.findById);
router.post('/patients', jwtMW, patientsController.create);
router.put('/patients/:id', jwtMW, patientsController.update);

router.get('/vaccinations', jwtMW, vaccinationsController.findByPatientId);
router.post('/vaccinations', jwtMW, vaccinationsController.create);
router.put('/vaccinations/:id', jwtMW, vaccinationsController.update);

router.get('/vaccines', jwtMW, vaccinesController.all);
router.post('/vaccines', jwtMW, vaccinesController.create);
router.put('/vaccines/:id', jwtMW, vaccinesController.update);

router.get('/analytics/register', jwtMW, analyticsController.register);
router.get('/analytics/gender', jwtMW, analyticsController.gender);

router.post('/login', usersController.auth);
router.post('/register', jwtMW, usersController.create);
router.put('/users/:id', jwtMW, usersController.update);
router.get('/users', jwtMW, usersController.all);
router.get('/me', jwtMW, usersController.getMe);

module.exports = router;