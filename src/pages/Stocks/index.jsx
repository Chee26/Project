// index.jsx
import { Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import { Button, Divider, Input, Modal, Spin, Typography } from "antd";
import { sum, round, isEmpty } from "lodash-es";
import fetchStockData from './stockapi.js'; // Adjust the path as necessary


const { Search } = Input;
const Stocks = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [equity, setEquity] = useState("AAPL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiKey = 'VVM67WWF4DBHEVX7'

  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        const stockData = await fetchStockData(equity, apiKey);
        setData(stockData); // Already formatted, just set it
        setLoading(false);
    };

    loadData();
}, [equity]); // Depend on equity to re-fetch when it changes

  const showModal = () => {
    setLoading(true);
    setTimeout(() => {
      setIsModalOpen(true);
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getPrediction = (values = []) =>
    round(sum(values) / values.length + Math.random(), 2);

  const onSearch = (value) => setEquity(value.toUpperCase());
  

  
  // const fakeData = [
  //   { year: "1991", value: 3 },
  //   { year: "1992", value: 4 },
  //   { year: "1993", value: 3.5 },
  //   { year: "1994", value: 5 },
  //   { year: "1995", value: 4.9 },
  //   { year: "1996", value: 6 },
  //   { year: "1997", value: 7 },
  //   { year: "1998", value: 9 },
  //   { year: "1999", value: 13 },
  // ];

  const config = {
    // data: fakeData,
    data: data.length > 0 ? data : [{ day: '', value: 0 }], // Use actual data if available
    height: 400,
    xField: 'day', // Changed from 'year' to 'day'
    // xField: "year",
    yField: "value",
    smooth: true,
  };

  return (
    <div>
      <Typography.Title>
        Retrieve and Predict the stock historical data
      </Typography.Title>
      <Search
        placeholder={
          "Please input the name of the equity. The sample below is Apple inc.(APPL)"
        }
        size={"large"}
        onSearch={onSearch}
        enterButton
      />
      <Spin spinning={loading}>
        <Divider>
          <Typography.Title level={5}> The Stock of {equity}</Typography.Title>
        </Divider>
        <Line {...config} />
      </Spin>

      <Button
        enabled={isEmpty(data)}
        onClick={showModal}
        block
        danger
        type="primary"
        loading={loading}
      >
        One click to Predict next day price
      </Button>
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

export default Stocks;
