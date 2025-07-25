const express = require("express");
const router = express.Router();
const { handleGoogleAuth, registerWithEmail, loginWithEmail, isValidEmail, findUserById} = require('../Controllers/UserController');

// Email Registration
router.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    const { email, name, password } = req.body;
    console.log(email, name, password)

    // Basic validation
    if (!email || !name || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, name, and password are required' 
      });
    }
    
    // if (!authService.isValidEmail(email)) {
    //   return res.status(400).json({ 
    //     success: false, 
    //     message: 'Invalid email format' 
    //   });}
    
    const user = await registerWithEmail(email, name, password);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Email Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    const user = await loginWithEmail(email, password);
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


// Google OAuth callback (simplified)
router.post('/google', async (req, res) => {
  try {
    console.log(req.body);
    const { email, name, googleId } = req.body; // From Google OAuth
    console.log(email, name, googleId);

    if (!email || !name || !googleId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Google user data incomplete' 
      });
    }
    
    const user = await handleGoogleAuth({
      email, name, googleId
    });
    
    res.json({
      success: true,
      message: 'Google authentication successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


module.exports = router;