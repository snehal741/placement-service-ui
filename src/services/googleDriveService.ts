// Google Drive API Service for Resume Upload using Backend API (No CORS issues)
export class GoogleDriveService {
  private static instance: GoogleDriveService;

  // Google Drive API configuration from environment variables
  private readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  private constructor() {}

  public static getInstance(): GoogleDriveService {
    if (!GoogleDriveService.instance) {
      GoogleDriveService.instance = new GoogleDriveService();
    }
    return GoogleDriveService.instance;
  }

  // Convert file to base64 for backend upload
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // Upload file via backend API (avoids CORS issues)
  async uploadFile(file: File, applicantName: string): Promise<string> {
    try {
      console.log('Converting file to base64...');
      const fileData = await this.fileToBase64(file);

      console.log('Uploading to backend...');
      const response = await fetch(`${this.API_URL}/api/upload-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.name,
          fileData: fileData,
          applicantName: applicantName
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to upload file');
      }

      const result = await response.json();
      console.log('File uploaded successfully:', result.shareableLink);

      return result.shareableLink;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  // Get file download link (helper method)
  getDownloadLink(fileId: string): string {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
}

export default GoogleDriveService;
