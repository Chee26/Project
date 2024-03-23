import React from 'react';
import { Card, Typography, Image } from 'antd';
const { Meta } = Card;

const News = () => {
  // Placeholder GIF URL, replace it with your actual GIF URL
  const gifUrl = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzhzOTRsNzJnYTd2d3JpbmVxaGU4OTl3c3ZrbDJzdnAweTdlMWtvYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fPRwBcYd71Lox1v7p2/giphy.gif'; // Example GIF, replace with your valid GIF URL
  
  // Array of 12 items for the 4x3 matrix.
  const cards = Array.from({ length: 12 }).map((_, idx) => ({
    id: idx,
    title: `Card Title ${idx + 1}`,
    description: `Description for card ${idx + 1}`,
    image: gifUrl, // Using the GIF URL for each card
  }));

  return (
    <div>
      <Typography.Title level={2}>Global Live Business News</Typography.Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
        {cards.map((card) => (
          <Card
            key={card.id}
            hoverable
            style={{ width: 'calc(25% - 16px)', marginBottom: '16px' }} // Adjust card width for 4x3 matrix, accounting for gap
            cover={<Image alt={`Card Image ${card.id}`} src={card.image} />}
          >
            <Meta title={card.title} description={card.description} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
