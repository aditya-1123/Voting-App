const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Candidate = require('./../models/candidate');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');


const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);     
        if(user.role === 'admin') {
            return true;
        }
    }
    catch(err) {
        return false;
    }
};

// POST route to add a candidate 
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try { 
        if(! await checkAdminRole(req.user.id)) 
            return res.status(403).json({message: 'user does not have admin role'});

        const data = req.body; // Assuming the request body contains the candidate data 

        // Create new User document using the Mongoose model
        const newCandidate = new Candidate(data);

        // save new person to the database 
        const response = await newCandidate.save();
        console.log('data saved');
        res.status(200).json({response: response});
    } 
    catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});

router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if(!checkAdminRole(req.user.id)) 
            return res.status(403).json({message: 'user does not have admin role'});

        const candidateID = req.params.candidateID; // Extract the id from the URL parameter 
        const updatedcandidateData = req.body; // Updated data for the person 

        const response = await Candidate.findByIdAndUpdate(candidateID, updatedcandidateData, {
            new: true, // Return the updated document 
            runValidators: true, // Run Mongoose validation 
        });
        
        if(!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('candidate data updated'); 
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(501).json({ error: 'Invalid Server Error' });
    }
})

router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if(!checkAdminRole(req.user.id)) 
            return res.status(403).json({message: 'user does not have admin role'});

        const candidateID = req.params.candidateID; // Extract the id from the URL parameter 
        const updatedcandidateData = req.body; // Updated data for the person 

        const response = await Candidate.findByIdAndDelete(candidateID);

        if(!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('candidate deleted'); 
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(501).json({ error: 'Invalid Server Error' });
    }
})

module.exports = router;