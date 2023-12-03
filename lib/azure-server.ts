import { BlobServiceClient } from "@azure/storage-blob";
import * as fs from "fs";

const AZURE_STORAGE_CONNECTION_STRING="BlobEndpoint=https://pdqachat2pdf.blob.core.windows.net/;QueueEndpoint=https://pdqachat2pdf.queue.core.windows.net/;FileEndpoint=https://pdqachat2pdf.file.core.windows.net/;TableEndpoint=https://pdqachat2pdf.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-01-03T21:40:05Z&st=2023-12-03T13:40:05Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=jlFkND4aA3q%2FWm9FkIj2VUc6XhKLh6ujBL8FeEAbMh4%3D"
const AZURE_CONTAINER_NAME="data-storage"
const AZURE_STORAGE_ACCOUNT_NAME="pdqachat2pdf"

export async function downloadFromAzureBlobStorage(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a BlobServiceClient to interact with the Azure Blob storage
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
      );

      // Get a reference to the container where the blob is stored
      const containerName = AZURE_CONTAINER_NAME;
      const containerClient = blobServiceClient.getContainerClient(containerName);

      // Get a BlockBlobClient for the specified file key
      const blockBlobClient = containerClient.getBlockBlobClient(file_key);

      // Define the local file path where you want to save the downloaded file
      const file_name = `/tmp/${Date.now().toString()}.pdf`;

      // Download the blob to the local file
      const response = await blockBlobClient.downloadToFile(file_name);
    //   console.log(response,"hihihihihihi")

      // Check if the download was successful and resolve with the file path
      if (response._response.status === 200) {
        resolve(file_name);
      } else {
        reject("File download failed.");
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

// Example usage:
// downloadFromAzureBlobStorage("uploads/your_file.pdf");
