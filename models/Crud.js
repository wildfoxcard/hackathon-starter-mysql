const db = require("../config/db")
const uuidv4 = require('uuid').v4;

const crud = ({ tableName, defaultData, isSoftDelete }) => {
    let isNewRecord = false;
    isSoftDelete = isSoftDelete === false ? isSoftDelete :  true;

    function autoCrud(data) {

        if (!data.id) {
            isNewRecord = true;
            data.id = uuidv4();
        }

        //map default Object
        for (prop in defaultData) {
            if (typeof(defaultData[prop]) === 'function') {
                this[prop] = defaultData[prop].bind(this)
            } else {
                this[prop] = defaultData[prop]
            }
        }

        //public: map data to this object
        for (prop in data) {
            this[prop] = data[prop]
        }


        this.getPublicProperties = () => {
            let publicProperties = Object.assign({}, this);
            return publicProperties
        }

        this.save = async (cb) => {
            const self = this;
            return new Promise((resolve, reject) => {
                let publicProperties = this.getPublicProperties();

                //insert
                if (isNewRecord) {
                    if (autoCrud.preInsert) {
                        const blocking = autoCrud.preInsert(self);
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
                    delete publicProperties.id
                    if (autoCrud.preUpdate) {
                        const blocking = autoCrud.preInsert(self);
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

    autoCrud.find = async (obj, cb) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${tableName}`,
                sqlParams = [];

            if (!obj) {
                obj = {};
            }

            if (isSoftDelete) {
                obj.is_deleted = false;
            }

            for (var prop in obj) {
                sqlParams.push(`${prop} = ${db.escape(obj[prop])}`)
            }
            sql = `${sql} WHERE ${sqlParams.join(' and ')}`;

            db.query(sql, function (err, result, fields) {
                let returningArray =[];
                for (var i = 0; i < result.length; i++) {
                    returningArray.push(new autoCrud(result[i]))
                }
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
        })
    }

    autoCrud.findById = async function(id, cb) {
        return new Promise((resolve, reject) => {
            let isDeletedExtention = '';
            if (isSoftDelete) {
                isDeletedExtention = ` AND is_deleted = 0`;
            }

            db.query(`SELECT * FROM ${tableName} WHERE id = ${db.escape(id)}${isDeletedExtention}`, function (err, result, fields) {
                result = result && result.length ? new autoCrud(result[0]) : null;
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

    autoCrud.findOne = async (obj, cb) => {
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
                result = result && result.length ? new autoCrud(result[0]) : null;
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

    autoCrud.deleteOne = async (obj, cb) => {
        return new Promise((resolve, reject) => {
            autoCrud.findOne(obj, (err, data) => {
                let sql = `SELECT * FROM ${tableName}`,
                    sqlParams = [];
                for (var prop in obj) {
                    sqlParams.push(`${prop} = ${db.escape(obj[prop])}`)
                }
                sql = `${sql} WHERE ${sqlParams.join(' and ')} LIMIT 1`

                autoCrud.findOne(obj, (err, user) => {

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

    return autoCrud;
}

module.exports = crud;