const AWS = require("aws-sdk");

const getTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;

    const results = await dynamodb
      .get({
        TableName: "TaskTable",
        Key: {
          id: id,
        },
      })
      .promise();

    const task = results.Item;

    return {
      status: 200,
      body: {
        task,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTask,
};
