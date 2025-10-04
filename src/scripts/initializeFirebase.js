import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initialProjects } from '../data/initialProjects';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
  authDomain: "2xgen-website.firebaseapp.com",
  projectId: "2xgen-website",
  storageBucket: "2xgen-website.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890123456789012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initializeProjects() {
  try {
    const projectsCollection = collection(db, 'projects');
    
    // Add each project to Firestore
    for (const project of initialProjects) {
      await addDoc(projectsCollection, project);
      console.log(`Added project: ${project.title}`);
    }
    
    console.log('All projects initialized successfully!');
  } catch (error) {
    console.error('Error initializing projects:', error);
  }
}

// Run the initialization
initializeProjects(); 