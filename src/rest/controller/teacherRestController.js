var mongoose = require('mongoose');

var teacherRestController = function(teacherModel) {


    var echoMsg = function(req, res) {
        res.status(200);
        res.send("echo REST GET returned input msg:" + req.params.msg);
    };


    var find = function(req, res) {
        teacherModel.find(function(error, teachers) {
            if (error) {
                res.status(500);
                res.send("Internal server error");
            } else {
                res.status(200);
                res.send(teachers);
            }
        });
    };


    var findById = function(req, res) {
        if (req.params && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
            teacherModel.findById(req.params.id, function(error, teacher) {
                if (error) {
                    res.status(404);
                    res.send("Not found teacher for id:" + req.params.id);
                } else {
                    res.status(200);
                    res.send(teacher);
                }
            });
        } else {
            res.status(400);
            res.send("Check inputs of request. InCorrect inputs. Expected _id value in url of GET request. req.params.id:" + req.params.id);
        }
    };

    var save = function(request, response) {
        var teacher = new teacherModel(request.body);
        console.log("--> LOOK request: %s", request); // JSON.stringify(request)
        console.log("--> LOOK JSON.stringify(request.body): %s", JSON.stringify(request.body));
        console.log("--> LOOK request.body: %s", request.body);
        console.log("--> LOOK teacher: %s", teacher);
        teacher.save(function(error) {
            if (error) {
                response.status(500);
                response.send("Save failed");
            } else {
                response.status(201);
                response.send(teacher);
            }
        });
    };


    var findByIdUpdateFullyThenSave = function(req, res) {
        if (req.params && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
            teacherModel.findById(req.params.id, function(error, teacher) {
                if (error) {
                    res.status(404);
                    res.send("Not found teacher for id:" + req.params.id);
                } else {
                    console.log("req.body.updatedOn: %s", req.body.updatedOn);
                    teacher.teacherId = req.body.teacherId;
                    teacher.name = req.body.name;
                    teacher.lastname = req.body.lastname;
                    teacher.age = req.body.age;
                    teacher.title = req.body.title;
                    teacher.isFullTime = req.body.isFullTime;
                    teacher.updatedOn = req.body.updatedOn;

                    teacher.save(function(error) {
                        if (error) {
                            res.status(500);
                            res.send("Save failed");
                        } else {
                            res.status(201);
                            res.send(teacher);
                        }
                    });
                }
            });
        } else {
            res.status(400);
            res.send("Check inputs of request. InCorrect inputs. Expected _id value in url of PUT request. req.params.id:" + req.params.id);
        }
    };


    var findByIdUpdatePartiallyThenSave = function(req, res) {
        teacherModel.findById(req.params.id, function(error, teacher) {
            if (error) {
                res.status(404);
                res.send("Not found teacher for id: %s", req.params.id);
            } else {
                if (req.body._id) {
                    delete req.body._id;
                }

                for (var attrName in req.body) {
                    teacher[attrName] = req.body[attrName];
                }

                teacher.save(function(error) {
                    if (error) {
                        res.status(500);
                        res.send("Save failed");
                    } else {
                        res.status(201);
                        res.send(teacher);
                    }
                })
            }
        });
    };


    var findByIdThenRemove = function(req, res) {
        teacherModel.findById(req.params.id, function(error, teacher) {
            if (error) {
                res.status(404);
                res.send("Not found teacher for id: %s", req.params.id);
            } else {
                teacher.remove(function(error) {
                    if (error) {
                        res.status(500);
                        res.send("Remove failed");
                    } else {
                        res.status(204);
                        res.send(teacher);
                    }
                })
            }
        });
    };


    var findByIdInBodyThenRemove = function(req, res) {
        teacherModel.findById(req.body._id, function(error, teacher) {
            if (error) {
                res.status(404);
                res.send("Not found teacher for id: %s", req.body._id);
            } else {
                teacher.remove(function(error) {
                    if (error) {
                        res.status(500);
                        res.send("Remove failed");
                    } else {
                        res.status(204);
                        res.send(teacher);
                    }
                })
            }
        });
    };

    return {
        echoMsg: echoMsg,
        find: find,
        findById: findById,
        save: save,
        findByIdUpdateFullyThenSave: findByIdUpdateFullyThenSave,
        findByIdUpdatePartiallyThenSave: findByIdUpdatePartiallyThenSave,
        findByIdThenRemove: findByIdThenRemove,
        findByIdInBodyThenRemove: findByIdInBodyThenRemove
    }
};

module.exports = teacherRestController;