const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const models = require('./models');

const setupAuth = (app) => {
    app.use(cookieParser());

    app.use(session({
        secret: 'secretserverword',
        resave: true,
        saveUninitialized: true,
    }));

    // add the github strategy
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http://localhost:3001/auth/github/login"
    }, (accessToken, refreshToken, profile, done) => {
        models.User.findOrCreate({
            where: {
                githubId: profile.id
            },
            defaults: {
                username: profile.login,
                githubId: profile.id,
                email: profile.email,
            }
        })
        .then(result => {
            return done(null, result[0]);
        })
        .catch(done);
    }));

    // add the local (user/pass) strategy
    passport.use(new LocalStrategy({
        // options: https://github.com/jaredhanson/passport-local#parameters
        // change these if you want a different field name for username or password
        // usernameField: 'username',
        // passwordField: 'password',
    }, (username, password, done) => {
        // check if there is a user with the username given
        models.User.findOne({
            where: {
                'username': username
            }
        })
        .then((currentUser) => {
            // if there isn't a current User
            if (!currentUser) {
                // return an error
                return done(null, false, { message: 'Incorrect username' })
            }
            // If the password doesn't match
            if (!bcrypt.compareSync(password, currentUser.password)) {
                // return an error
                return done(null, false, { message: 'Incorrect password' })
            }
            // otherwise, return the user object
            return done(null, currentUser)
        })
        .catch(done);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((userId, done) => {
        done(null, userId);
    })

    app.use(passport.initialize());

    app.use(passport.session());

    // this is a simple API to check if there is a user
    app.get('/api/user', (req, res, next) => {
        if (req.user) {
            return res.json({ user: req.user })
        } else {
            return res.json({ user: null })
        }
    })

    // use the github strategy
    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/redirect',
        passport.authenticate('github', {
            // if this works, redirect back to the react app homepage
            successRedirect: '/',
            // otherwise, go to the react app login
            failureRedirect: '/login',
        })
    );

    app.post('/auth/signup', (req, res) => {
        // destructure username and password off req.body into new constants
        const { username, password } = req.body;
        // Check if there is a user with the given username
        models.User.findOne({
            where: {
                'username': username
            }
        })
        .then((currentUser) => {
            // if there is a user already
            if (currentUser) {
                // return an error
                return res.json({
                    error: `Sorry, already a username '${username}' is already taken`
                });
            }
            // otherwise, create a new user and encrypt the password
            models.User.create({
                'username': username,
                'password': bcrypt.hashSync(password, 10)
            })
            .then((newUser) => {
                // we don't want to return everything, so put all the fields into a new object
                const data = {
                    ...newUser.get()
                };
                // and then delete the password off that object
                delete data.password;
                // return the cleaned object
                return res.json(data);
            })
            .catch((err) => {
                // if there's an error, return that
                return res.json(err);
            });
        })
    })

    app.post('/auth/login',
        passport.authenticate('local'),
        (req, res) => {
            // req.user will have been deserialized at this point, so we need
            // to get the values and remove any sensitive ones
            const cleanUser = {...req.user.get()};
            if (cleanUser.password) {
                console.log(`Removing password from user:`, cleanUser.username);
                delete cleanUser.password
            }
            res.json({ user: cleanUser });
        }
    )

    app.get('/auth/logout', (req, res, next) => {
        if (req.user) {
            req.logout();
            return res.json({ msg: 'user logged out' });
        } else {
            return res.json({ msg: 'no user to log out' });
        }
    });
}

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;