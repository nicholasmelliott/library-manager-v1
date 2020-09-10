'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patrons = sequelize.define('Patrons', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter a first name (ex. Andy)."
        }  
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter a last name (ex. Weir)."
        }  
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter an address (ex. 123 Easy Street)."
        }  
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter an email address (ex. example@gmail.com)."
        },
        isEmail: {
          args: true,
          msg: "Please enter a valid email address (ex. example@gmail.com)."
        }  
      }
    },
    library_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "The library id is a duplicate. Please enter a different one."
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter a library id (ex. MCL1110)."
        }  
      }
    },
    zip_code: { 
      type: DataTypes.INTEGER,
      validate: {
        is: {
          args: /^\d{5}(?:[-\s]\d{4})?$/,
          msg: "Please enter a valid zip code (ex. 59005)"  
        }
      }
    }
  }, {
    timestamps: false
  });
  Patrons.associate = function(models) {
    // associations can be defined here
    
  };
  return Patrons;
};