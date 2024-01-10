import React, { useState } from 'react';
import { NFTStorage, File } from 'nft.storage';

const UploadToNFTStorage = () => {
  const API_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZGN0ZhOTg5OTVkM0M1YUFmQ0M5MkJCMDUyNEFmYjhFY2QyM2RjOTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMzE2Mzg3NzM2MiwibmFtZSI6InRlc3QifQ.DqMBsgr5ZGDDgP5szlP0BNIWLbgWyrpnG8T2LtTXPnA';
  const [nftData, setNFTData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const [uploadStatus, setUploadStatus] = useState('');

  const client = new NFTStorage({ token: API_TOKEN });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setNFTData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleUpload = async () => {
    try {
      setUploadStatus('Uploading to NFT.Storage...');

      const metadata = await client.store({
        name: nftData.name,
        description: nftData.description,
        image: new File(
          [
            /* data */
          ],
          nftData.image.name,
          {
            type: nftData.image.type,
          }
        ),
      });

      setUploadStatus(`NFT uploaded successfully! IPFS URL: ${metadata.url}`);
    } catch (error) {
      setUploadStatus(`Error uploading to NFT.Storage: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md border rounded-md shadow-lg mt-10 bg-white">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Upload to NFT.Storage
      </h1>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          NFT Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={nftData.name}
          onChange={handleInputChange}
          placeholder="Enter the name of the NFT"
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600"
        >
          NFT Description
        </label>
        <textarea
          id="description"
          name="description"
          value={nftData.description}
          onChange={handleInputChange}
          placeholder="Enter a description of NFT"
          className="mt-1 p-2 border rounded-md w-full h-32 resize-none focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-600"
        >
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        type="button"
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Upload NFT
      </button>

      <p className="mt-4 mr-4 overflow-auto text-center text-green-600">
        {uploadStatus}
      </p>
      {/* <img src="" alt=""> */}
      img
    </div>
  );
};

export default UploadToNFTStorage;
