module.exports = (sequelize, DataTypes)=>{
    var Parents = sequelize.define('Parents', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 255]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail: true
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 255]
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
              isNumeric: true,
              isInt: true,
              len: [3]
            }
        },
        cat: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        dog: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
  
    return Parents;
};
  