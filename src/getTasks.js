const AWS = require("aws-sdk");

const getTasks = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const results = await dynamodb.scan({ TableName: "TaskTable" }).promise();

    const tasks = results.Items;

    return {
      status: 200,
      body: {
        quantity: tasks.length,
        tasks,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTasks,
};
