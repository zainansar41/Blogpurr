import bcrypt from 'bcrypt'
import connect from '../dbCon/db.js'
import ENV from '../config.js'
import { DynamoDBClient, ScanCommand, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import jwt from 'jsonwebtoken'


const client = new DynamoDBClient({
    region: ENV.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: ENV.AWS_ACCESS_KEY_ID,
        secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
    },
});
const TABLE_NAME = ENV.USER_TBL

const generateToken = (email) => {
    const token = jwt.sign({
        useremail: email
    }, ENV.JSON_TOKEN, { expiresIn: "24h" })
    return token

}


export async function register(req, res) {
    try {
        const { email, password } = req.body;
        const command = new ScanCommand({
            TableName: TABLE_NAME,
            FilterExpression: "Email = :e",
            ExpressionAttributeValues: {
                ":e": { S: email },
            },
        });

        client.send(command)
            .then((result) => {
                if (result.Count > 0) {
                    return Promise.reject({ error: "email is already taken" });
                } else {
                    if (password) {
                        bcrypt.hash(password, 12).then((hashedpassword) => {
                            const command = new PutItemCommand({
                                TableName: TABLE_NAME,
                                Item: {
                                    Email: { S: email },
                                    Password: { S: hashedpassword },
                                    firstname: { S: 'Your first Name' },
                                    lastname: { S: 'Your last Name' },
                                    twitter: { S: 'Your twitter handle' },
                                    instagram: { S: 'Your instagram handle' },
                                    facebook: { S: 'Your facebook handle' }
                                },
                            });
                            client.send(command)
                                .then((result) => {
                                    const token = generateToken(email)
                                    res.status(201).send({ msg: "You has been register successfully", token });
                                })
                                .catch((error) => {
                                    res.status(500).send({ error });
                                });
                        });
                    }
                }
            })
            .catch((error) => {
                res.send(error);
            });
    } catch (error) {
        res.send(error);
    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const command = new ScanCommand({
            TableName: TABLE_NAME,
            FilterExpression: "Email = :e",
            ExpressionAttributeValues: {
                ":e": { S: email },
            },
        });
        const result = await client.send(command);
        if (result.Count === 0) {
            res.status(401).send({ msg: "Email is not found " });
        } else {
            const FetchedUser = result.Items;
            const FetchedPassword = FetchedUser[0].Password.S;
            bcrypt
                .compare(password, FetchedPassword)
                .then((passwordChecked) => {
                    if (!passwordChecked) {
                        return res.status(400).send({ error: "incorrect password" });
                    }
                    const token = generateToken(email)
                    res.status(200).send({ msg: "You are Successfully Logged in", token });
                })
                .catch((error) => {
                    res.status(401).send({ error: "Password is incorrect or Try Sign Up" });
                });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
}


export async function getUserData(req, res) {
    try {
        const { useremail } = req.user
        if (useremail) {
            const command = new ScanCommand({
                TableName: TABLE_NAME,
                FilterExpression: "Email = :e",
                ExpressionAttributeValues: {
                    ":e": { S: useremail },
                },
            });
            const result = await client.send(command);
            if (result.Count === 1) {
                res.status(200).send(result.Items[0])
            }
            else {
                return res.status(400).send({ error })
            }

        }
    } catch (error) {
        res.status(400).send({ error })
    }
}

export async function updateUser(req, res) {
    try {
        const { useremail } = req.user;
        const { firstname, lastname, twitter, instagram, facebook } = req.body;
        if (useremail) {
            const command = new UpdateItemCommand({
                TableName: ENV.USER_TBL,
                Key: {
                    'Email': { S: useremail },
                },
                UpdateExpression: 'set #f = :firstname, #l = :lastname, #t = :twitter, #i = :instagram, #fb = :facebook',
                ExpressionAttributeNames: {
                    '#f': 'firstname',
                    '#l': 'lastname',
                    '#t': 'twitter',
                    '#i': 'instagram',
                    '#fb': 'facebook'
                },
                ExpressionAttributeValues: {
                    ':firstname': { S: firstname },
                    ':lastname': { S: lastname },
                    ':twitter': { S: twitter },
                    ':instagram': { S: instagram },
                    ':facebook': { S: facebook }
                },
            });
            const result = await client.send(command);
            res.status(201).send({ msg: 'Your profile is updated successfully' });
        } else {
            return res.status(400).send({ error: 'User email not defined' });
        }
    } catch (error) {
        console.error('Error updating user: ', error);
        res.status(400).send({ error:"Internal Server Error try Later" });
    }
}