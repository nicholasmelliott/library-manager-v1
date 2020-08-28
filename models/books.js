'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "The title is a duplicate. Please enter another title."
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter a book title (ex. The Martian)."
        }  
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter the author's name (ex. Andy Weir)."
        }  
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter the book's genre (ex. Science Fiction)."
        }  
      }
    },
    first_published: {
      type: DataTypes.INTEGER(4),
      validate: {
        validateYear: function(value) {
          if( !(new RegExp(/^\d{4}$/).test(value)) && value !== '') {
             throw new Error('Please enter a year (ex. 2014) or leave the field blank.')
          }
       }
      }
    } 
  }, {
    timestamps: false,
    unique: false
  });
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};