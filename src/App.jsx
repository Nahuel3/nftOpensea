import React, { useState, useEffect } from 'react';
import './NFTGallery.css';


const NFTGallery = () => {
  const [nfts, setNFTs] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'X-API-KEY': '314a308105454f8db5ec7000a046c9e8' }
    };

    fetch('https://api.opensea.io/v2/collection/freedomk/nfts?limit=50', options)
      .then(response => response.json())
      .then(data => {
        setNFTs(data.nfts);
        
      })
      .catch(error => {
        console.error('Error al obtener los datos de los NFT:', error);
      });

      fetch('https://api.opensea.io/v2/offers/collection/freedomk', options)
      .then(response => response.json())
      .then(data => {
        setOffers(data.offers);
      })
      .catch(error => {
        console.error('Error al obtener las ofertas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de NFTs</h1>
      <ul className="nft-gallery">
        {nfts.map(nft => {
          const offer = offers.find(offer => offer.id === nft.identifier);
          return (
            <li key={nft.identifier} className="nft-item">
              <img src={nft.image_url} alt={nft.name} />
              <p>NftName: {nft.name}</p>
              <p>Collection: {nft.collection}</p>
              {offer ? (
                <>
                  <p>Offer ID: {offer.id}</p>
                  <p>Offer Price: {offer.price}</p>
                </>
              ) : (
                <p>No hay oferta para este NFT.</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NFTGallery;
