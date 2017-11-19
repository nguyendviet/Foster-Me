module.exports = (sequelize, DataTypes)=>{
    var Parent = sequelize.define('Parent', {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 72]
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
            defaultValue: false
        },
        dog: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
  
    return Parent;
};
  