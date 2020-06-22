const { ObjectModel } = require("objectmodel");
const db = require("../config/db")
const uuidv4 = require('uuid').v4;

const crud = ({ tableName, defaultData }) => {
    let isNewRecord = false;
    let isSoftDelete = true;

    function mainObj(data) {

        if (!data.id) {
            isNewRecord = true;
            data.id = uuidv4();
        }

        //map default Object
        for (prop in defaultData) {
            this[prop] = defaultData[prop]
        }

        //public: map data to this object
        for (prop in data) {
            this[prop] = data[prop]
        }


        this.getPublicProperties = () => {
            let publicProperties = Object.assign({}, this);
            delete publicProperties.id
            return publicProperties
        }

        this.save = async (cb) => {
            const self = this;
            return new Promise((resolve, reject) => {
                let publicProperties = this.getPublicProperties();

                //insert
                if (isNewRecord) {
                    if (mainObj.preInsert) {
                        const blocking = mainObj.preInsert(self);
                    }
                    var query = db.query(`INSERT INTO ${tableName} SET ?`, publicProperties, function (err, result, fields) {

                        if (err && !cb) {
                            console.error(err);
                        } else if (!err && cb) {
                            cb(err, result, fields);
                        } else if (err && cb) {
                            cb(err, null, null)
                        } else {
                            resolve(result);
                        }
                        // Neat!
                    });
                    //update
                } else {
                    if (mainObj.preUpdate) {
                        const blocking = mainObj.preInsert(self);
                    }
                    var query = db.query(`UPDATE ${tableName} SET ? WHERE id = ${db.escape(this.id)}`, publicProperties, function (err, result, fields) {

                        if (err && !cb) {
                            console.error(err);
                        } else if (!err && cb) {
                            cb(err, result, fields);
                        } else if (err && cb) {
                            cb(err, null, null)
                        } else {
                            resolve(result);
                        }
                        // Neat!
                    });
                }
            })
        }
    }

    mainObj.findById = async (id, cb) => {
        return new Promise((resolve, reject) => {

            db.query(`SELECT * FROM ${tableName} WHERE id = ${db.escape(id)}`, function (err, result, fields) {
                result = result && result.length ? new mainObj(result[0]) : null;
                if (err && !cb) {
                    console.error(err);
                } else if (!err && cb) {
                    cb(err, result, fields);
                } else if (err && cb) {
                    cb(err, null, null)
                } else {
                    resolve(result);
                }
            });
        });
    }

    mainObj.findOne = async (obj, cb) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${tableName}`,
                sqlParams = [];

            if (isSoftDelete) {
                obj.is_deleted = false;
            }

            for (var prop in obj) {
                sqlParams.push(`${prop} = ${db.escape(obj[prop])}`)
            }
            sql = `${sql} WHERE ${sqlParams.join(' and ')} LIMIT 1`

            // if connection is successful
            db.query(sql, function (err, result, fields) {
                result = result && result.length ? new mainObj(result[0]) : null;
                if (err && !cb) {
                    console.error(err);
                } else if (!err && cb) {
                    cb(err, result, fields);
                } else if (err && cb) {
                    cb(err, null, null)
                } else {
                    resolve(result);
                }
            });
        });
    }

    mainObj.deleteOne = async (obj, cb) => {
        return new Promise((resolve, reject) => {
            mainObj.findOne(obj, (err, data) => {
                let sql = `SELECT * FROM ${tableName}`,
                    sqlParams = [];
                for (var prop in obj) {
                    sqlParams.push(`${prop} = ${db.escape(obj[prop])}`)
                }
                sql = `${sql} WHERE ${sqlParams.join(' and ')} LIMIT 1`

                mainObj.findOne(obj, (err, user) => {

                    if (isSoftDelete) {
                        db.query(`UPDATE ${tableName} SET is_deleted = 1 WHERE id = ${db.escape(user.id)}`, function (err, result, fields) {
                            if (err && !cb) {
                                console.error(err);
                            } else if (!err && cb) {
                                cb(err, result, fields);
                            } else if (err && cb) {
                                cb(err, null, null)
                            } else {
                                resolve(result);
                            }
                        });
                    } else {
                        db.query(`DELETE FROM ${tableName} WHERE id = ${db.escape(user.id)}`, function (err, result, fields) {
                            if (err && !cb) {
                                console.error(err);
                            } else if (!err && cb) {
                                cb(err, result, fields);
                            } else if (err && cb) {
                                cb(err, null, null)
                            } else {
                                resolve(result);
                            }
                        });
                    }
                    
                });
                // if connection is successful


            });
        });
    }

    return mainObj;
}

module.exports = crud;