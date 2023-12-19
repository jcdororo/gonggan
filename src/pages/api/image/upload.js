// pages/api/upload.js

import formidable from 'formidable';
import { MongoClient } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ error: 'Error parsing form' });
        return;
      }

      const image = files.image;

      try {
        await client.connect();
        const database = client.db('your_database_name');
        const collection = database.collection('your_collection_name');

        const result = await collection.insertOne({
          image: {
            data: image.path,
            contentType: image.type,
          },
        });

        res.status(200).json({ success: true, insertedId: result.insertedId });
      } catch (error) {
        console.error('Error uploading image to MongoDB:', error);
        res.status(500).json({ error: 'Error uploading image to MongoDB' });
      } finally {
        await client.close();
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
