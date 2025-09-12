const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.ALLOWED_ORIGINS || 'https://mauliplacements.com').split(',')
    : [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000'
      ],
  credentials: true
}));

// Increase request size limits for file uploads (base64 files can be large)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Google OAuth2 configuration for uploading to your personal Drive
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3001/auth/google/callback'
);

// Validate OAuth configuration
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ Missing Google OAuth credentials in .env file');
  console.error('Please ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set');
  process.exit(1);
}

// Set credentials if refresh token exists
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
  console.log('✅ Google OAuth client configured with refresh token');
}

app.post('/api/google-token', async (req, res) => {
  try {
    console.log('Requesting Google Drive access token...');

    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return res.status(400).json({
        error: 'Google OAuth not configured',
        message: 'Please visit /auth/google to authorize the application',
        authUrl: '/auth/google'
      });
    }

    // Get access token using refresh token
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);

    console.log('Google Drive token obtained successfully');

    res.json({
      access_token: credentials.access_token,
      expires_in: Math.floor((credentials.expiry_date - Date.now()) / 1000),
      token_type: 'Bearer'
    });
  } catch (error) {
    console.error('Error getting Google token:', error);
    res.status(500).json({
      error: 'Failed to get Google Drive access token',
      details: error.message
    });
  }
});

app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.file'],
    prompt: 'consent'
  });

  console.log('🔗 Visit this URL to authorize the application:');
  console.log(authUrl);

  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log('✅ Google OAuth successful!');
    console.log('Add this refresh token to your .env file:');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);

    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Authorization Successful!</h2>
          <p>Copy this refresh token to your <code>.env</code> file:</p>
          <pre style="background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-wrap: break-word;">GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}</pre>
          <p>Then restart your server.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).send('Authorization failed');
  }
});

app.post('/api/upload-resume', async (req, res) => {
  try {
    console.log('Uploading resume to Google Drive...');

    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return res.status(400).json({
        error: 'Google OAuth not configured',
        message: 'Please visit /auth/google to authorize the application'
      });
    }

    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const { fileName, fileData, applicantName } = req.body;

    if (!fileName || !fileData || !applicantName) {
      return res.status(400).json({
        error: 'Missing required fields: fileName, fileData, applicantName'
      });
    }

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(fileData.split(',')[1], 'base64');

    // Create a readable stream from the buffer
    const { Readable } = require('stream');
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null); // End the stream

    const fileMetadata = {
      name: `Resume_${applicantName}_${new Date().getTime()}.${fileName.split('.').pop()}`,
      parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : undefined
    };

    const getMediaType = (filename) => {
      const ext = filename.toLowerCase().split('.').pop();
      switch (ext) {
        case 'pdf': return 'application/pdf';
        case 'doc': return 'application/msword';
        case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        default: return 'application/octet-stream';
      }
    };

    const media = {
      mimeType: getMediaType(fileName),
      body: readableStream
    };

    const fileResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    });

    const fileId = fileResponse.data.id;
    console.log(`File uploaded successfully with ID: ${fileId}`);

    await drive.permissions.create({
      fileId: fileId,
      resource: {
        role: 'reader',
        type: 'anyone'
      }
    });

    console.log('File permissions set to public');

    const shareableLink = `https://drive.google.com/file/d/${fileId}/view`;

    res.json({
      success: true,
      fileId: fileId,
      shareableLink: shareableLink,
      downloadLink: `https://drive.google.com/uc?export=download&id=${fileId}`
    });

  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    res.status(500).json({
      error: 'Failed to upload file to Google Drive',
      details: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Mauli Placements Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    details: err.message
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mauli Placements Backend running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Google token endpoint: http://localhost:${PORT}/api/google-token`);

  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    console.log(`🔗 First-time setup: Visit http://localhost:${PORT}/auth/google to authorize`);
  }
});
