import { MongoClient, ServerApiVersion } from "mongodb";

const dbUri = process.env.DATABASE_URI;
let dbInstance = null;

const getDatabase = async () => {
    try {
        if (dbInstance) return dbInstance;
    
        const client = new MongoClient(
            dbUri,
            {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
            },
        );
        
        await client.connect();
        dbInstance = client.db("Posts");

        dbInstance.command({ ping: 1 });
        console.log("[SERVER] DB Connected successfully!");

        return dbInstance;
    } catch (error) {
        console.log(error);
    };
};

export default getDatabase;
