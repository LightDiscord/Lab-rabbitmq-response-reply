#!/usr/bin/env node

const amqp = require('amqplib')

async function send () {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    const queue = 'task_queue'

    channel.assertQueue(queue, { durable: true })
    
    console.log(`> Waiting for messages in %s. To exit press CTRL+C`, queue)
    channel.consume(queue, (message) => {
        const seconds = message.content.toString().split('.').length - 1

        console.log(`> Message received : %s`, message.content.toString())

        setTimeout(() => console.log(`> Done`), seconds * 1000)
    }, {noAck: true})
}

send().catch(console.warn)