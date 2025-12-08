//npm install firebase
const admin = require('firebase-admin');

// Replace with the path to your downloaded service account key
const serviceAccount = require('./serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function testConnection() {
  try {
    console.log('Testing Firestore connection...');
    
    // Write a test document
    const docRef = db.collection('goalTracker').doc('userData');
    await docRef.set({
      sliders: {
        algorithms: 0,
        dataStructures: 0,
        lowLevelDesign: 0,
        highLevelDesign: 0,
        kubernetes: 0
      },
      progressData: {},
      timestamp: new Date().toISOString()
    });
    console.log('✓ Successfully wrote test data to Firestore!');
    
    // Read it back
    const doc = await docRef.get();
    if (doc.exists) {
      console.log('✓ Successfully read data from Firestore:');
      console.log(JSON.stringify(doc.data(), null, 2));
    } else {
      console.log('✗ Document not found after writing');
    }
    
    console.log('\n✓ Firebase connection is working! Your web app issue is likely due to opening index.html directly from file://');
    console.log('Solution: Serve your app via HTTP instead of opening the file directly.');
    
  } catch (err) {
    console.error('✗ Error accessing Firestore:', err);
  }
}

testConnection();