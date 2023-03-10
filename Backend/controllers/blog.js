import ENV from '../config.js'
import { DynamoDBClient, ScanCommand, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import * as cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

cloudinary.v2.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_ID,
    api_secret: ENV.CLOUDINARY_API_SECRET,
    secure: true
});


const client = new DynamoDBClient({
    region: ENV.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: ENV.AWS_ACCESS_KEY_ID,
        secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
    },
});
const TABLE_NAME = ENV.BLOG_TBL

export async function addblog(req, res) {
    try {
        const { useremail } = req.user
        if (useremail) {
            let saveIMG = []
            const { category, content, description, heading, keywords, image1, image2, type } = req.body
            try {
                const result1 = await cloudinary.v2.uploader.upload(image1)
                const result2 = await cloudinary.v2.uploader.upload(image2)
                saveIMG.push(result1.secure_url)
                saveIMG.push(result2.secure_url)
                const bID = uuidv4().toString();
                const words = keywords && keywords.split(',') || []
                const keywordList = words.map((word) => ({ S: word }));
                const command = new PutItemCommand({
                    TableName: TABLE_NAME,
                    Item: {
                        blogID: { S: bID },
                        useremail: { S: useremail },
                        heading: { S: heading },
                        content: { S: content },
                        description: { S: description },
                        type: { S: type },
                        category: { S: category },
                        keywords: { L: keywordList },
                        Images: {
                            L: [
                                { S: saveIMG[0] },
                                { S: saveIMG[1] }
                            ]
                        }
                    },
                });

                client.send(command)
                    .then((result) => {
                        res.status(201).send({ msg: "data is saved in dynamoDB", result })
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(401).send({ error: "error in uploading blog! try later" })
                    })
            } catch (error) {
                res.status(401).send({ error: "error in uploading files" })
            }


        }
        else {
            res.send({ err: "error" })
        }

    } catch (error) {
        res.status(400).send({ error })
    }
}

export async function fetchblog(req, res) {
    try {
        const { useremail } = req.user;
        if (useremail) {
            const command = new ScanCommand({
                TableName: TABLE_NAME,
                FilterExpression: "useremail = :e",
                ExpressionAttributeValues: {
                    ":e": { S: useremail },
                },
            });
            try {
                const result = await client.send(command)
                if (result.Count > 0) {
                    res.send(result.Items)
                }
                else {
                    res.send({ msg: "no blog found" })
                }
            } catch (error) {
                res.send({ error: "error in recieving" })
            }
        }
        else {
            res.send({ error: "Useremail not found" })
        }

    } catch (error) {
        res.send({ error: "error in api" })
    }
}

export async function fetchSingleBlog(req, res) {
    try {
        const { id } = req.params
        const command = new ScanCommand({
            TableName: TABLE_NAME,
            FilterExpression: "blogID = :id",
            ExpressionAttributeValues: {
                ":id": { S: id },
            }
        })

        client.send(command).then((result) => {
            res.send(result.Items)
        })
            .catch(err => { res.send({ error: "Error in Loading Blog" }) })

    } catch (error) {
        res.send({ error })
    }

}

export const getBlogs = (req, res) => {
    const params = {
        TableName: TABLE_NAME
    };
    try {
        const command = new ScanCommand(params);
        client.send(command)
            .then(result => {
                console.log(result.LastEvaluatedKey);
                res.status(200).send(result.Items);
            })
            .catch(error => {
                res.status(404).send({ error });
            });
    } catch (error) {
        res.status(401).send(error);
    }
};

export const blogByCategory = (req, res) => {
    try {
        const { category } = req.params

        const command = new ScanCommand({
            TableName: TABLE_NAME,
            FilterExpression: "category = :categoryName",
            ExpressionAttributeValues: {
                ":categoryName": { S: category },
            }
        })

        client.send(command).then((result) => {
            res.send(result.Items)
        })
            .catch(err => { res.send({ error: "Error in Loading Blog" }) })

    } catch (error) {
        res.status(404).send({ error })
    }
}

export const blogByService = (req, res) => {
    try {
        const { typeOfBlog } = req.params

        const command = new ScanCommand({
            TableName: TABLE_NAME,
            FilterExpression: "#t = :typeName",
            ExpressionAttributeNames: {
                "#t": "type",
            },
            ExpressionAttributeValues: {
                ":typeName": { S: typeOfBlog },
            }
        })

        client.send(command).then((result) => {
            res.send(result.Items)
        })
            .catch(err => {
                console.log(err);
                res.send({ error: "Error in Loading Blog" })
            })

    } catch (error) {
        res.status(404).send({ error })
    }
}


export const blogSearch = (req, res) => {
    try {
        const { search } = req.params;
        console.log(search);


        const command = new ScanCommand({
            TableName:TABLE_NAME,
            FilterExpression: "contains(#key, :search)",
            ExpressionAttributeNames: {
                "#key": "keywords",
            },
            ExpressionAttributeValues: {
                ":search": { S: search },
            }
            
        })
        client.send(command)
            .then(result => {
                if (result.Count > 0) {
                    res.status(200).send(result.Items);
                }
                else {
                    res.send({error:"no result Found"})
                }
            })
            .catch(error => {
                res.status(404).send({ error });
            });


    } catch (error) {
        res.send({ error })
    }
}