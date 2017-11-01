#!/usr/bin/env node

const amqp = require('amqplib')

async function send () {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    const queue = 'hello'

    channel.assertQueue(queue, { durable: false })
    
    console.log(`> Waiting for messages in %s. To exit press CTRL+C`, queue)
    channel.consume(queue, (message) => {
        console.log(`> Message received : %s`, message.content.toString())
    }, {noAck: true})
}

send().catch(console.warn)