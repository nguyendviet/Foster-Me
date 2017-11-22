module.exports = (sequelize, DataTypes)=>{
    var Shelter = sequelize.define('Shelter', {
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
        }
    });
  
    return Shelter;
};
  