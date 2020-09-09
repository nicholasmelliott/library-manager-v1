'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loans = sequelize.define('Loans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Please select a book."
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Please select a patron."
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
        allowNull: false,
        unique: false,
        validate: {
          isDate: {
            args: true,
            msg: "Please enter a valid date (ex. 2020-12-31)."
          },
          notEmpty: {
            args: true,
            msg: "Please enter a date (ex. 2020-12-31)."
          }  
        }
    },
    return_by: {
      type: DataTypes.DATEONLY,
        allowNull: false,
        unique: false,
        validate: {
          isDate: {
            args: true,
            msg: "Please enter a valid date (ex. 2020-12-31)."
          },
          notEmpty: {
            args: true,
            msg: "Please enter a date (ex. 2020-12-31)."
          }  
        }
    },
    returned_on: {
      type: DataTypes.DATEONLY,
      validation: {
        isDate: true,
        allowNull: true
      }
    }
  }, {
    timestamps: false
  });
  Loans.associate = function(models) {
    // associations can be defined here
    Loans.belongsTo(models.Books, { foreignKey: 'book_id', as: 'books' });
    Loans.belongsTo(models.Patrons, { foreignKey: 'patron_id', as: 'patrons' });
  };
  return Loans;
};