const { v4 } = require("uuid");
const aws = require("aws-sdk");

const addTask = async (data) => {
  try {
    const { title, description } = JSON.parse(data.body);

    const createdAt = new Date().toISOString();
    const id = v4();
    const dynamoDb = new aws.DynamoDB.DocumentClient();
    const newTask = {
      id,
      title,
      description,
      createdAt,
    };

    await dynamoDb
      .put({
        TableName: "TaskTable",
        Item: newTask,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newTask),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

module.exports = { addTask };
