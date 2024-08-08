import { Author } from '../models/Author.models.js';
import { Webhook } from 'svix'

const newUserInMongoDB = async function (req, res) {
    try {
        console.log('Received a webhook request');

        const payloadString = JSON.stringify(req.body);
        console.log(payloadString);

        const svixHeaders = req.headers;

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY)

        const evt = wh.verify(payloadString, svixHeaders);
        console.log(evt);

        const { id, ...attributes } = evt.data;

        const eventType = evt.type;
        console.log(eventType);


        if (eventType === 'user.created') {
            const authorId = id
            const firstName = attributes.first_name
            const lastName = attributes.last_name
            const username = attributes.username
            const profilePic = attributes.image_url
            const emailAddress = attributes.email_addresses[0].email_address

            const author = new Author({
                authorId: authorId,
                firstName: firstName,
                lastName: lastName,
                username: username,
                profilePic: profilePic,
                emailAddress: emailAddress
            })

            console.log(author);

            await author.save();
            res.send("author created")
        }

        res.status(200).json({
            success: true,
            message: 'Webhook received'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export default newUserInMongoDB