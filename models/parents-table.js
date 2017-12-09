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
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
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
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            // allowNull: false (show later when geomap ready)
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            // allowNull: false (show later when geomap ready)
        }
    });
  
    return Parent;
};