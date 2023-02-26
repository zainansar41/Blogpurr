import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import ENV from '../config.js'

async function connect(){
    const client = new DynamoDBClient({
        region: ENV.AWS_DEFAULT_REGION,
        credentials: {
            accessKeyId: ENV.AWS_ACCESS_KEY_ID,
            secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
        },
    });
    return client;
}

export default connect()