// Import necessary modules and components from Ant Design
import { Button, Flex, List, Modal, Typography } from "antd";
import { useState } from "react"; // Import useState hook from React

// Array of profiles with title and description
const profiles = [
  {
    title: "CHEE EVELYN",
    desc: "E0202424",
  },
  {
    title: "ONG JING CHUAN",
    desc: "E0524739",
  },
  {
    title: "Wang Lin",
    desc: "E0925567",
  },
];

// Array of course points
const course_points = [
  "Design and develop a user-friendly interface using HTML, CSS,  JavaScript, MongoDB, where users can enter stock symbols to search for historical data.",
  "Retrieve the stock historical data from the API and present it on the website in an trend chart.",
  "Integrating features with living business news.",
  "Predict next day stock price by simply using historical data average",
  "Used mongo database to record searching history"
];

// Functional component for rendering project summary
const Summary = () => {
  return (
    <div>
      {/* Flex container for project title */}
      <Flex gap={16}>
        <Typography.Title level={5}>Project Title </Typography.Title>
        <Typography.Title level={4}>
          Web application for [finance news] [stock historical data] [stock price prediction] 
        </Typography.Title>
      </Flex>
      {/* Flex container for project description */}
      <Flex
        gap={16}
        vertical
        align={"center"}
        style={{ backgroundColor: "white" }}
      >
        <Typography.Title level={5}>Project Description </Typography.Title>
        {/* List component for rendering course points */}
        <List
          dataSource={course_points} // Data source for list
          renderItem={(item) => <List.Item>{item}</List.Item>} // Render each item in the list
        />
      </Flex>
      {/* List component for rendering profiles */}
      <List
        style={{ marginTop: 16, backgroundColor: "white" }}
        bordered
        itemLayout="horizontal"
        dataSource={profiles} // Data source for list
        renderItem={(item, index) => (
          <List.Item>
            {/* Meta information for each list item */}
            <List.Item.Meta
              title={item.title} // Title of the profile
              description={item?.desc} // Description of the profile
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Summary; // Export Summary component
