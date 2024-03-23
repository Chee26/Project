import { Button, Flex, List, Modal, Typography } from "antd";
import { useState } from "react";

const profiles = [
  {
    title: "CHEE EVELYN",
    desc: "Student ID",
  },
  {
    title: "ONG JING CHUAN",
    desc: "Student ID",
  },
  {
    title: "Wang Lin",
    desc: "E0925567",
  },
];

const course_points = [
  "Design and develop a user-friendly interface using HTML, CSS, and JavaScript, where users can enter stock symbols or company names to search for historical data.",
  "Retrieve the stock historical data from the API and present it on the website in an organized and visually appealing manner, such as charts, tables, or other data visualization techniques.",
  "Integrating features like live business news, an earnings calendar etc.",
   "Predict next day stock price by using historical data and machine learning",
];
const Summary = () => {
  return (
    <div>
      <Flex gap={16}>
        <Typography.Title level={5}>Project Title </Typography.Title>
        <Typography.Title level={4}>
          Web application for [finanice news] [stock historical data] [stock price prediction] 
        </Typography.Title>
      </Flex>
      <Flex
        gap={16}
        vertical
        align={"center"}
        style={{ backgroundColor: "white" }}
      >
        <Typography.Title level={5}>Project Description </Typography.Title>
        <List
          dataSource={course_points}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Flex>
      <List
        style={{ marginTop: 16, backgroundColor: "white" }}
        bordered
        itemLayout="horizontal"
        dataSource={profiles}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={item?.desc}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Summary;
