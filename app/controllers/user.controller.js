var User = require('mongoose').model('User');

exports.create = function(req, res, next){
    console.log(req.body);
    var user = new User(req.body);
    user.save(function(err, user){
        if(err){
            console.log("Save Error");
            return next(err);
            
        }else{
            console.log("Save complete");
            res.json(user);
            
        }
    }); 
};

exports.signup = function(req, res){
    res.render('signup', {
        'title':'Sign Up',
        'message':'Wecome to signup page'
    });
};



exports.login = function(req, res){
    if(req.body.remember === 'remember'){
        req.session.remember = true;
        req.session.email = req.body.email;
    }
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var error = req.validationErrors();
    if(error){
        res.render('index', {
            title: 'There have been validation error: '+ JSON.stringify(error),
            isLoggedIn: false
        });
        return;
    };


    console.log(req.body);
    console.log('Email : '+req.body.email);
    console.log('Password : '+req.body.password);

    res.render('index',{
        title:'Logged in as : '+req.body.email,
        isLoggedIn: true
    })
}

exports.logout = function(req, res){
    req.session = null;
    res.render('index',{
        title: 'See you again later',
        isLoggedIn: false
    });
};

exports.list = function(req, res, next){
    User.find({}, function(err, users){
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    });
};

exports.read = function(req, res){
    res.json(req.user);
}  

exports.update = function(req, res, next){
    User.findByIdAndUpdate({username:req.user.username}, req.body, function(err, user){
        if(err){
            return next(err);
        }else{
            res.json(user);
        }
    });
};

exports.delete = function(req, res, next){
    req.user.remove(function(err){
        if(err){
            return next(err);
        }else{
            res.json(req.user);
        }
    });
};

exports.userByUsername = function(req, res, next, username){
    User.findOne({
        username: username
    },function(err, user){
        if(err){
        return next(err);
        }else{
            req.user = user;
            next();
        }
    });
};

