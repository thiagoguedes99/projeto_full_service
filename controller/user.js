'user strict'

// imports nodejs
const fs = require('fs');
const path = require('path');

// imports npm
const bcrypt = require('bcrypt-nodejs');

// my imports
const userModel = require('../model/user');
const jwt = require('../config/jwt');

// export of functions
module.exports = {
    findAll,
    findId,
    login,
    save,
    update,
    remove,
    getImage
}

function findAll(req, res) {
    res.status(200).send('ok');
}

function findId(req, res) {

}

function login(req, res) {
    let param = req.body;

    if (param.email == null || param.password == null) {
        return res.status(400).send({ message: 'dados incorretos login' });
    }

    userModel.findOne({ email: param.email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'server error, find login user' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'user not fund' });
            } else {
                bcrypt.compare(param.password, user.password, (err, check) => {
                    if (err) {
                        res.status(500).send({ message: 'server error, find login user password' });
                    } else {
                        if (check) {
                            res.status(200).send({
                                image: user.image,
                                token: jwt.CreateToken(user)
                            });
                        } else {
                            return res.status(400).send({ message: 'Usuário ou Senha incorretos' });
                        }
                    }
                });
            }
        }
    });

}

function save(req, res) {
    let param = req.body;

    if (param.name == null || param.email == null || param.password == null) {
        return res.status(400).send({ message: 'dados incorretos' });
    }

    bcrypt.hash(param.password, null, null, (err, myhash) => {
        if (err) {
            return res.status(500).send({ message: 'server error, convert password' });

        } else {
            param.password = myhash;

            let user = new userModel();

            user.name = param.name;
            user.email = param.email;
            user.password = param.password;
            user.level = null;

            // save image
            /*if (req.files.image.path) {
                let filePath = req.files.image.path;
                let fileSplit = filePath.split('\\');
                let fileName = fileSplit[2];
                user.image = fileName;
            } else {
                //user.image = fileName;
            }*/

            user.save((err, resp) => {
                if (err) {
                    res.status(500).send({ message: 'server error, save user' });
                } else {
                    res.status(200).send({ message: 'saved user' });
                }
            });
        }
    });
}

function update(req, res) {
    userModel.findByIdAndUpdate(req.body.id, req.body, (err, userUpdate) => {
        if (err) {
            return res.status(500).send({ message: 'server erro update user' });
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'user not found' });
            } else {
                res.status(200).send(userUpdate);
            }
        }
    });
}

function remove(req, res) {
    userModel.findByIdAndRemove(req.body.id, (err, userRemove) => {
        if (err) {
            return res.status(500).send({ message: 'server erro update user' });
        } else {
            if (!userRemove) {
                res.status(404).send({ message: 'user not found' });
            } else {
                res.status(200).send({ message: 'user removed' });
            }
        }
    });
}

function getImage(req, res) {
    let pathFile = `./upload/user/${req.params.imageName}`;

    fs.exists(pathFile, (check) => {
        if (check) {
            res.status(200).sendFile(path.resolve(pathFile));
        } else {
            res.status(404).send({ message: 'image not found' });
        }
    });
}