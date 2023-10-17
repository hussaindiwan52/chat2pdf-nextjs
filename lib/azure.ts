import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const AZURE_STORAGE_CONNECTION_STRING="BlobEndpoint=https://pdqachat2pdf.blob.core.windows.net/;QueueEndpoint=https://pdqachat2pdf.queue.core.windows.net/;FileEndpoint=https://pdqachat2pdf.file.core.windows.net/;TableEndpoint=https://pdqachat2pdf.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-12-13T17:01:39Z&st=2023-10-13T09:01:39Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=I5Zo5M4I1xku817wVvdPGLntYBqHL5ZcMHHMHBT8%2Btg%3D"
const AZURE_CONTAINER_NAME="data-storage"
const AZURE_STORAGE_ACCOUNT_NAME="pdqachat2pdf"

export async function uploadToAzureBlobStorage(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a BlobServiceClient to interact with the Azure Blob storage
      
    //   console.log( AZURE_STORAGE_CONNECTION_STRING)
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
      );

      // Get a reference to the container where you want to store the blob
      const containerName = AZURE_CONTAINER_NAME;
      const containerClient = blobServiceClient.getContainerClient(containerName);

      // Define the blob name (key) with a timestamp and the original file name
      const file_key =
        "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

      // Get a BlockBlobClient to upload the file
      const blockBlobClient = containerClient.getBlockBlobClient(file_key);

      // Upload the file to Azure Blob Storage
      await blockBlobClient.uploadData(file);

      // Resolve with the file key and file name
      resolve({
        file_key,
        file_name: file.name,
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getAzureBlobUrl(file_key: string) {
  const containerName = AZURE_CONTAINER_NAME;
  const url = `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${file_key}`;
  return url;
}
