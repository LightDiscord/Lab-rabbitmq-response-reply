#!/usr/bin/env node

const amqp = require('amqplib')

async function send () {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    const queue = 'hello'

    channel.assertQueue(queue, { durable: false })
    channel.sendToQueue(queue, new Buffer('Hello world!'))
    console.log(`> Sent 'Hello world!'`)

    setTimeout (() => connection.close(), 500)    
}

send().catch(console.warn)