require('dotenv').config({ silent: true })
const bcrypt = require('bcrypt');

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

async function fetchWithQuery(query, coleccion){
    await MongoConnection.connect()
    const collection = bd.collection(coleccion)

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
    return results[0].data

}

async function getUserData(email, unsecure_pssw){
    await MongoConnection.connect()
    const collection = bd.collection('usuarios')

    const query = {"data.email" : email}

    const result = collection.find(query)
    let results = []

    for await (const doc of result) {
        results.push(doc)
    }

    const isok = await bcrypt.compare(unsecure_pssw, results[0].data.pssw);

    await MongoConnection.close()

    if(isok){
        return results
    } else {
        return false
    }
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

async function newReserva(email, date, n_personas, estado){
    await MongoConnection.connect()
    const collection = bd.collection('reservas')

    try{

        const data = {
            "_id" : `${email}_${date}`,
            "data" : {
                "email" : email,
                "fecha" : date,
                "n_personas" : n_personas,
                "estado" : estado
            }
        }
        
        response = await collection.insertOne(data)
        
        return response
    } catch (error){
        console.log(error)
    } finally {
        await MongoConnection.close()
    } 

}

async function reservaEvento(email, evento, estado){
    await MongoConnection.connect()
    const collection = bd.collection('reservas')

    try{

        evento = evento.replace(/ /g, "_")

        const data = {
            "_id" : `${email}_${evento}`,
            "data" : {
                "email" : email,
                "evento" : evento,
                "estado" : estado
            }
        }
        
        response = await collection.insertOne(data)
        
        return response
    } catch (error){
        console.log(error)
    } finally {
        await MongoConnection.close()
    } 
}

async function findAndUpdate(data, query, coll){

    await MongoConnection.connect()
    const collection = bd.collection(coll)

    try{
        info = {}

        for (key in data){
            asd = `data.${key}`
            info[asd] = data[key]
        }

        const newData = {
            $set : info
        }

        console.log(query)
        console.log(newData)
        
        response = await collection.updateOne(query, newData)
        
        return response
    } catch (error){
        console.log(error)
    } finally {
        await MongoConnection.close()
    } 

}

async function addOne(data, coll){

    await MongoConnection.connect()
    const collection = bd.collection(coll)
    try{

        const info = {
            data
        }

        response = await collection.insertOne(info)
        
        return response
    } catch (error){
        console.log(error)
    } finally {
        await MongoConnection.close()
    } 

}

async function deleteOne(data, coll){
    await MongoConnection.connect()
    const collection = bd.collection(coll)

    try{

        const query = { 'data.Titulo' : data.Titulo };

        const response = await collection.deleteOne(query);
        
        return response
    } catch (error){
        console.log(error)
    } finally {
        await MongoConnection.close()
    } 
}

module.exports = {fetch_all, fetchOne, getUserData, newUser, newReserva, reservaEvento, findAndUpdate,
                  deleteOne, addOne, fetchWithQuery
                 }