import React, { useState, useEffect } from 'react';

const NFTGallery = () => {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'X-API-KEY': '314a308105454f8db5ec7000a046c9e8' }
    };

    fetch('https://api.opensea.io/v2/chain/Ethereum/contract/0x495f947276749Ce646f68AC8c248420045cb7b5e/nfts?limit=10', options)
      .then(response => response.json())
      .then(data => {
        setNFTs(data.assets);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los NFT:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de NFTs</h1>
      <ul>
        {nfts.map(nft => (
          <li key={nft.id}>
            <img src={nft.image_preview_url} alt={nft.name} />
            <p>{nft.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTGallery;
