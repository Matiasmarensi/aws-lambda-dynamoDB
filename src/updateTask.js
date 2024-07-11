const AWS = require("aws-sdk");

const updateTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;
    const { title, description, done } = JSON.parse(event.body);

    const results = await dynamodb
      .update({
        TableName: "TaskTable",
        Key: { id },
        UpdateExpression: "set #title = :title, #description = :description, #done = :done",
        ExpressionAttributeNames: {
          "#title": "title",
          "#description": "description",
          "#done": "done",
        },
        ExpressionAttributeValues: {
          ":title": title,
          ":description": description,
          ":done": done,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      status: 200,
      body: JSON.stringify("Task updated successfully"),
      updatedTask: results.Attributes,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateTask,
};
