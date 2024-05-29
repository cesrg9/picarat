require('dotenv').config({ silent: true })
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const urlMongo = process.env.MONGO_URL
const nombreDB = process.env.MONGO_DB 

const MongoConnection = new MongoClient(urlMongo, {
    serverApi : {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const bd = MongoConnection.db(nombreDB)

async function fetch_all(coleccion){

    await MongoConnection.connect()
    const collection = bd.collection(coleccion)

    const query = {}

    const result = collection.find(query)
    let results = []

    for await (const doc of result) {
        results.push(doc)
    }

    await MongoConnection.close()
    return results

}

async function fetchOne(id, coleccion){

    await MongoConnection.connect()
    const collection = bd.collection(coleccion)

    const query = { "_id" : new ObjectId(id) };

    const result = collection.find(query)
    let results = []

    for await (const doc of result) {
        results.push(doc)
    }

    await MongoConnection.close()
    return results

}

module.exports = {fetch_all, fetchOne
                 }