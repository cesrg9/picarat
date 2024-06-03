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

async function getUserData(email, pssw){
    await MongoConnection.connect()
    const collection = bd.collection('usuarios')

    const query = { $and : [ {"data.email" : email}, {"data.pssw" : pssw} ]}

    const result = collection.find(query)
    let results = []

    for await (const doc of result) {
        results.push(doc)
    }

    await MongoConnection.close()
    return results
}

async function newUser(info){
    await MongoConnection.connect()
    const collection = bd.collection('usuarios')

    try {
        const data = {
            'data' : {
                'email' : info.email,
                'pssw' : info.pssw,
                'nombre' : info.nombre,
                'tlf' : info.tlf
            }
        }
    
        response = await collection.insertOne(data)
        
        return response 
        
    } catch (error) {

        return error
        
    } finally {
        
        await MongoConnection.close()

    }

}

module.exports = {fetch_all, fetchOne, getUserData, newUser
                 }