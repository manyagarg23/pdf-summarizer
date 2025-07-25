const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
// Google OAuth - handles both registration and login
async function handleGoogleAuth(googleUser) {
  try {
    const { email, name, googleId } = googleUser;

    // Try finding user by emailID (since your schema uses emailID)
    let user = await User.findOne({ emailID: email });
    console.log(user);

    if (!user) {
      // New user - register with Google
      user = await User.create({
        emailID: email,
        name: name,
        password: null, // No password for Google users
        googleId: googleId,
        authProvider: 'google',
      });
      console.log(`New Google user registered: ${email}`);
    } else {
      // Existing user
      if (user.authProvider !== 'google') {
        throw new Error('Please login with email and password');
        alert("Please login with email and password");
      }
      console.log(`Google user logged in: ${email}`);
    }

    return user;
  } catch (error) {
    throw new Error(`Google auth failed: ${error.message}`);
  }
}

// Email Registration
async function registerWithEmail(email, name, password) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      return loginWithEmail(email, password);
    } else {
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      const user = await User.create({
        emailID: email, // <- FIXED
        name: name,
        password: hashedPassword,
        authProvider: 'email',
        });

      console.log(`New email user registered: ${email}`);
      return user;
    }
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
}

// Email Login
async function loginWithEmail(email, password) {
  try {
    // Match the field name from the registration
    const user = await User.findOne({ emailID: email }).select('+password');
    if (!user) {
      throw new Error('User not found');
    }

    // If user registered with Google only
    if (user.authProvider === 'google' && !user.password) {
      throw new Error('Please login with Google');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    console.log(`Email user logged in: ${email}`);
    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
}


// Simple email validation
function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}


module.exports = {
  handleGoogleAuth,
  registerWithEmail,
  loginWithEmail,
  isValidEmail
};
