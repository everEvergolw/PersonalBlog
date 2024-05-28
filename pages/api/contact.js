import { MongoClient, ServerApiVersion } from 'mongodb';

// Define the MongoDB URI
const uri = "mongodb+srv://MyBlog:Myblog123..@cluster0.pbsc2de.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with specific API options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Helper function to connect to the database
async function connectToDatabase() {
  await client.connect();
  const db = client.db("MyBlogDB"); // Adjust the database name as necessary
  return { client, db };
}

// The main API handler function
async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, name, message } = req.body;

  if (
    !email || 
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !message ||
    message.trim() === ''
  ) {
    res.status(422).json({ message: 'Invalid input.' });
    return;
  }

  const newMessage = {
    email,
    name,
    message,
  };

  let client;

  try {
    console.log('Connecting to the database...');
    const connection = await connectToDatabase();
    client = connection.client;
    const db = connection.db;

    console.log('Inserting the new message...');
    const result = await db.collection('messages').insertOne(newMessage);
    newMessage.id = result.insertedId;
    await client.close();
    console.log('Message successfully stored!');

    res.status(201).json({ message: 'Successfully stored message!', data: newMessage });
  } catch (error) {
    if (client) {
      await client.close();
    }
    const isConnectionError = error.message && error.message.includes('connect');
    console.error('Error occurred:', error);

    res.status(500).json({ 
      message: isConnectionError ? 'Could not connect to database.' : 'Storing message failed!',
      error: error.message // Consider logging this instead of sending to client for security
    });
  }  
}

export default handler;
