"use strict";

const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "List Users"
      #swagger.description = `You can send query with endpoint for search[], sort[], page and limit.`
          <ul> Examples:
              <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
              <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
              <li>URL/?<b>page=2&limit=1</b></li>
          </ul>
    */

    const data = await res.getModelList(
      User
      // req.user.isAdmin ? {} : { _id: req.user.id }
    );
    const details = await res.getModelListDetails(User);
    res.status(200).send({
      error: false,
      details,
      data,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
    const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findById(userId);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(202).send({
      error: false,
      data,
    });
  },
  deleteUser: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */
    const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findByIdAndDelete(userId);
    if (data) {
      return res.status(200).send({
        message: "User Deleted Succesfully",
      });
    }
    return res.status(404).send({
      error: true,
      message: "User not found or already deleted",
    });
  },
};
