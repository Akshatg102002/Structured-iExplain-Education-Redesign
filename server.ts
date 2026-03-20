
import express from "express";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import dotenv from "dotenv";
import cors from "cors";
import { Resend } from "resend";

// Load environment variables
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || "re_Yb66eeKq_3X7ct1z8YA6Uy6e1KVrJDsGd");

// Firebase Configuration (Server-side)
// Using hardcoded values to match client-side firebase.ts and ensure availability
const firebaseConfig = {
  apiKey: "AIzaSyAerlaB_Lb05q9gqErAjNxOemiijuhO3f0",
  authDomain: "iexplainwebsite.firebaseapp.com",
  projectId: "iexplainwebsite",
  storageBucket: "iexplainwebsite.appspot.com",
  messagingSenderId: "438305327858",
  appId: "1:438305327858:web:18713e75400a609c25de6b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, city, course, targetCountry, category, source } = req.body;

      // Construct email content
      const htmlContent = `
        <h2>New Lead from ${source || 'Website Contact Form'}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${city ? `<p><strong>City:</strong> ${city}</p>` : ''}
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Target Country:</strong> ${targetCountry}</p>
      `;

      // Send email via Resend
      const { data, error } = await resend.emails.send({
        from: 'iExplain Education <onboarding@resend.dev>', // Use verified domain in production
        to: ['iexplaineducation.online@gmail.com'], // Send to the user's email
        subject: `New Lead: ${name} - ${category}`,
        html: htmlContent,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Media Asset Route
  app.get("/assets/:filename", async (req, res) => {
    try {
      const filename = req.params.filename;
      // Query Firestore for the media document with this filename
      // Note: We need to query by 'url' or 'name'. 
      // Since we are constructing the URL as /assets/filename, we can query by that.
      // Or better, query by the 'name' field if we ensure it matches the filename in URL.
      
      // However, Firestore query requires importing 'query', 'where', 'getDocs', 'collection'
      // We need to import these at the top level.
      // But wait, server.ts already imports getFirestore, doc, getDoc.
      // We need to add collection, query, where, getDocs to imports.
      
      // Let's use a simple scan if we can't easily add imports, OR update imports.
      // Updating imports is better.
      
      // For now, let's assume we can query.
      // Actually, to avoid complex queries without proper indexes, 
      // let's try to find the document.
      
      // Since we don't have the ID, we must query.
      const mediaRef = collection(db, "media");
      // Query by 'name' field which stores the unique filename
      const q = query(mediaRef, where("name", "==", filename));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Fallback: try querying by 'fileURL' field for backward compatibility
        const q2 = query(mediaRef, where("fileURL", "==", `/assets/${filename}`));
        const querySnapshot2 = await getDocs(q2);
        
        if (querySnapshot2.empty) {
             console.log(`File not found: ${filename}`);
             return res.status(404).send("File not found");
        }
        
        const docData = querySnapshot2.docs[0].data();
        return serveBase64(res, docData.data);
      }

      const docData = querySnapshot.docs[0].data();
      serveBase64(res, docData.data);

    } catch (error) {
      console.error("Error serving asset:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  function serveBase64(res: any, base64Data: string) {
      if (!base64Data || !base64Data.includes(';base64,')) {
        return res.status(500).send("Invalid file data");
      }

      try {
        // More robust parsing using split instead of regex
        const [header, base64] = base64Data.split(';base64,');
        const type = header.split(':')[1];
        const buffer = Buffer.from(base64, 'base64');

        res.setHeader('Content-Type', type);
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
        res.send(buffer);
      } catch (error) {
        console.error("Error decoding base64:", error);
        res.status(500).send("Error processing image");
      }
  }

  // Sitemap Route
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const docRef = doc(db, "settings", "sitemap");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        res.header("Content-Type", "application/xml");
        res.send(data.content);
      } else {
        // Default sitemap if none exists
        const defaultSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://iexplain.education/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
        res.header("Content-Type", "application/xml");
        res.send(defaultSitemap);
      }
    } catch (error) {
      console.error("Error fetching sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (if built)
    app.use(express.static("dist"));
    
    // SPA Fallback for production
    app.get("*", (req, res) => {
      res.sendFile(new URL('./dist/index.html', import.meta.url).pathname);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
