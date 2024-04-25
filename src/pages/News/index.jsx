// index.jsx

import React, { useState, useEffect } from 'react';
import { Card, Typography, Image } from 'antd';
const { Meta } = Card;
import searchArticles from './newsapi.js'; // Import the function from newsapi.js

const News = () => {
  // Placeholder GIF URL, replace it with your actual GIF URL
  const gifUrl = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzhzOTRsNzJnYTd2d3JpbmVxaGU4OTl3c3ZrbDJzdnAweTdlMWtvYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fPRwBcYd71Lox1v7p2/giphy.gif'; 
  // Example GIF, replace with your valid GIF URL
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArticles() {
      try {
        const articlesData = await searchArticles("S&P 500");
        if (articlesData.length === 0) {
          // Handle scenario with no articles found
          setError("No articles found for the specified topic.");
        } else {
          setArticles(articlesData);
        }
      } catch (err) {
        setError("Failed to fetch articles. Please try again later.");
        console.error(err);  // Log the error to the console as well.
      }
    }

    loadArticles();
  }, []);

  if (error) {
    return <Typography.Title level={4} style={{ textAlign: 'center' }}>{error}</Typography.Title>;
  }

  // Array of 12 items for the 4x3 matrix.
  // const cards = Array.from({ length: 12 }).map((_, idx) => ({
  //   id: idx,
  //   title: `Card Title ${idx + 1}`,
  //   description: `Description for card ${idx + 1}`,
  //   image: gifUrl, // Using the GIF URL for each card
  // }));

  return (
    <div>
      <Typography.Title level={2}>Global Live Business News</Typography.Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
         {articles.map((article) => (
          <Card
            key={article.url} // Using the article URL as a unique identifier
            hoverable
            title={<a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>} // Title now part of the card's header, clickable
            style={{ width: 'calc(25% - 16px)', marginBottom: '16px' }} // Adjust card width for 4x3 matrix, accounting for gap
            cover={<Image alt={`${article.title} - image`} src={article.image || gifUrl} />}
          >
            {/* <Meta title={card.title} description={card.description} /> */}
            <Meta
                title={<a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>}
                description={`Published on: ${new Date(article.date).toLocaleDateString()}`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
