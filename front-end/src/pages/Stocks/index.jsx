// Import necessary modules and components
import { Line } from "@ant-design/charts"; // Line chart component from Ant Design Charts
import React, { useEffect, useState } from "react"; // React hooks for state management and side effects
import {
  Button,
  Divider,
  Input,
  List,
  Modal,
  Space,
  Spin,
  Typography,
} from "antd"; // Ant Design components for UI elements
import { sum, round, isEmpty } from "lodash-es"; // Lodash utility functions
const { Search } = Input; // Destructuring Input component from Ant Design
import { graphQLFetch } from "../../common/utils/index.js"; // Custom GraphQL fetch function
const Stocks = () => {
  // Component state variables using useState hook
  const [loading, setLoading] = useState(false); // Loading state for async operations
  const [listLoading, setListLoading] = useState(false); // Loading state for fetching logs
  const [data, setData] = useState([]); // State for stock data
  const [equity, setEquity] = useState(); // State for user input (equity name)
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [refresh, setRefresh] = useState(0); // State for triggering refresh
  const [logs, setLogs] = useState([]); // State for search history logs

  // Function to show modal
  const showModal = () => {
    setLoading(true); // Set loading state to true
    setTimeout(() => {
      setIsModalOpen(true); // Open modal after 1 second
      setLoading(false); // Set loading state to false
    }, 1000);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalOpen(false); // Close modal
  };

  // Function to calculate prediction
  const getPrediction = (values = []) =>
    round(sum(values) / values.length + Math.random(), 2); // Calculate prediction based on stock data

  // Function to handle search input
  const onSearch = (value) => setEquity(value); // Update equity state with search input

  // Asynchronous function to fetch stock data
  const asyncFetch = async () => {
    try {
      const query = `mutation { stockAdd(stock: {equity: "${equity}"}) }`; // GraphQL mutation query
      setLoading(true); // Set loading state to true
      const resp = await graphQLFetch(query, {}); // Fetch data from GraphQL API
      const res = resp?.["stockAdd"] || {}; // Extract response data
      setData(
        // Set stock data state
        Object.keys(res["Time Series (Daily)"]).map((k) => ({
          name: "close",
          date: k,
          price: Number(res["Time Series (Daily)"][k]["4. close"]),
        })).sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort data by date
      );
    } catch (e) {
      console.error("searchStockPrice", e); // Log error if fetching data fails
    } finally {
      setLoading(false); // Set loading state to false
      setRefresh((r) => r + 1); // Trigger refresh
    }
  };

  // Function to search logs
  const searchLogs = async () => {
    try {
      setListLoading(true); // Set list loading state to true
      const query = `query { stocksList {id equity searchDate }}`; // GraphQL query to fetch search logs
      const { stocksList = [] } = await graphQLFetch(query, {}); // Fetch search logs
      setLogs(stocksList); // Set search logs state
    } catch (e) {
      console.error(e); // Log error if fetching logs fails
    } finally {
      setListLoading(false); // Set list loading state to false
    }
  };

  // Effect hook to fetch stock data when equity state changes
  useEffect(() => {
    equity && void asyncFetch(); // Fetch data when equity state is not empty
  }, [equity]);

  // Effect hook to fetch search logs when refresh state changes
  useEffect(() => {
    void searchLogs(); // Fetch logs on component mount and when refresh state changes
  }, [refresh]);

  // Configuration for the line chart
  const config = {
    title: {
      visible: true,
      text: "The Stock Price",
    },
    padding: "auto",
    forceFit: true,
    data,
    xField: "date",
    yField: "price",
    legend: equity,
    xAxis: { type: "date" },
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    responsive: true,
  };

  // Render UI components
  return (
    <div>
      {/* Title for the section */}
      <Typography.Title>
        Retrieve and Predict the stock historical data
      </Typography.Title>
      {/* Search input */}
      <Search
        placeholder={
          "Please input the name of the equity. The sample below is Apple inc.(APPL)"
        }
        size={"large"}
        onSearch={onSearch} // Call onSearch function on search action
        enterButton
      />
      {/* Spinner while loading data */}
      <Spin spinning={loading}>
        {/* Divider */}
        <Divider>
          <Typography.Title level={5}> The Stock of {equity}</Typography.Title>
        </Divider>
        {/* Line chart component */}
        <Line {...config} />
      </Spin>
      {/* Button to show modal */}
      <Button
        disabled={isEmpty(data)} // Disable button if data is empty
        onClick={showModal} // Call showModal function on button click
        block
        danger
        type="primary"
        loading={loading}
      >
        One click to Predict next price
      </Button>
      {/* List to display search history */}
      <List
        header={<h3>Search history</h3>}
        loading={listLoading}
        dataSource={logs}
        bordered
        renderItem={(item) => (
          <List.Item>
            <Space wrap>
              <div>Equity: {item?.equity ?? 1111}</div>
              <div>|</div>
              <div>SearchTime: {String(item?.searchDate)}</div>
            </Space>
          </List.Item>
        )}
      />
      {/* Modal to display prediction */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        Predict the next value is{" "}
        {getPrediction(data.slice(-2).map((d) => d?.price || 0))}
      </Modal>
    </div>
  );
};

export default Stocks; // Export Stocks component
