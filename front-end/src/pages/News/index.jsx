// Import necessary modules from Ant Design and other sources
import { Card, Spin, Image, Typography } from "antd";
import { getTop10BusinessNews } from "./apis"; // Import function to fetch business news
import mockData from "./mock.json"; // Import mock data for development
import { useRequest } from "ahooks"; // Import useRequest hook from ahooks library

// Destructure Meta component from Card
const { Meta } = Card;

// Functional component for rendering business news
const News = () => {
  // Fetch business news using useRequest hook
  const { data, error, loading } = useRequest(getTop10BusinessNews);

  // Filter out articles with missing image URLs
  const cards = (data?.articles || mockData.articles).filter(
    (a) => a?.urlToImage,
  );

  // Render loading spinner while data is being fetched
  return loading ? (
    <Spin></Spin>
  ) : (
    // Render news cards once data is fetched
    <div>
      {/* Title for the section */}
      <Typography.Title>Global Live Business News</Typography.Title>
      {/* Render news cards in a flexbox layout */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {/* Map over the articles and create a Card for each one */}
        {cards.map((card, idx) => (
          <Card
            key={idx}
            hoverable
            loading={loading}
            style={{ width: 300 }}
            cover={<Image alt={idx} src={card?.urlToImage} />} // Card cover with article image
          >
            {/* Meta information for the card */}
            <Meta
              onClick={() => window.open(card?.url, "_blank")} // Open article URL in a new tab when clicked
              title={card?.author} // Author of the article
              description={card?.title} // Title of the article
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News; // Export the News component
