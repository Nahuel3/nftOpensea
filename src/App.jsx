import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NFTGallery = () => {
  const contractAddress = '0x495f947276749Ce646f68AC8c248420045cb7b5e'; // Dirección del contrato
  const apiEndpoint = `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&asset_contract_address=${contractAddress}`;

  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    // Realizar la solicitud a la API de OpenSea
    axios.get(apiEndpoint)
      .then(response => {
        // Actualizar el estado con los datos de los NFT
        setNFTs(response.data.assets);
        
      })
      .catch(error => {
        console.error('Error al obtener los datos de los NFT:', error);
      });
  }, [apiEndpoint]);

  return (
    <div>
      <h1>Lista de NFTs</h1>
      <ul>
        {nfts.map(nft => (
          <li key={nft.token_id}>
            <img src={nft.image_url} alt={nft.name} />
            <p>{nft.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTGallery;
