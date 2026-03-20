import { useState, useEffect } from 'react';
import { db, collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from '../firebase';

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string; // Base64 string
  fileURL?: string;
  storagePath: string; // Kept for compatibility, but will be empty or "firestore"
  createdAt: any;
}

export const useMedia = () => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const files = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MediaFile[];
      setMedia(files);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching media:", err);
      setError("Failed to load media library.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadFile = async (file: File) => {
    setError(null);
    
    // Check file size (approx 700KB limit for safety with Firestore 1MB limit)
    if (file.size > 700 * 1024) {
      throw new Error("File is too large. Please upload files smaller than 700KB.");
    }

    try {
      const base64Data = await convertFileToBase64(file);
      
      // Sanitize filename and add timestamp for uniqueness
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueName = `${timestamp}-${sanitizedName}`;
      const fileURL = `/assets/${uniqueName}`;

      await addDoc(collection(db, 'media'), {
        name: uniqueName, // Use unique name for storage/retrieval
        originalName: file.name, // Keep original name for display if needed
        type: file.type,
        size: file.size,
        data: base64Data,
        fileURL: fileURL, // This is the public URL
        storagePath: 'firestore', // Marker for direct storage
        createdAt: serverTimestamp(),
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload file.");
      throw err;
    }
  };

  const deleteFile = async (id: string) => {
    setError(null);
    try {
      // Just delete from Firestore since data is stored there
      await deleteDoc(doc(db, 'media', id));
    } catch (err: any) {
      console.error("Delete error:", err);
      setError("Failed to delete file.");
    }
  };

  return { media, loading, error, uploadFile, deleteFile };
};
