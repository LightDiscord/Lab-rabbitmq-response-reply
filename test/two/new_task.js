#!/usr/bin/env node

const amqp = require('amqplib')

async function send () {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    const queue = 'task_queue'
    const message = process.argv.slice(2).join(' ') || "World, new task!"

    channel.assertQueue(queue, { durable: true })
    channel.sendToQueue(queue, new Buffer(message), { persistent: true })
    console.log(`> Sent '%s'`, message)

    setTimeout (() => connection.close(), 500)    
}

send().catch(console.warn)