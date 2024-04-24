/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { getLiveData } from "./services";
import dayjs from "dayjs";
import { formattedData } from "./formattedData";
import ReactApexChart from "react-apexcharts";
import '../App.css'

interface LiveChartProps {
  symbol: string;
}

interface LiveData {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  values: {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }[];
  status: string;
}

const LiveChart: React.FC<LiveChartProps> = ({ symbol }) => {
  const [liveData, setLiveData] = useState<LiveData>({
    meta: {
      symbol: "",
      interval: "",
      currency: "",
      exchange_timezone: "",
      exchange: "",
      mic_code: "",
      type: "",
    },
    values: [],
    status: "",
  });

  useEffect(() => {
    getLiveData(symbol).then((data) => {
      console.log("data is:", data);
      setLiveData(data);
    });
  }, [symbol]);

  const dailySeriesData = useMemo(() => {
    return formattedData(liveData);
  }, [liveData]);

  console.log("Daily series data is:", dailySeriesData);

  const options = {
    chart: {
      height: 350,
      type: "candlestick",
    },
    title: {
      text: `Showing Chart For:${symbol}`,
      align: "left",
      style: {
        fontSize: "20px", 
        color: "#333", 
        fontWeight: "bold", 
        fontFamily: "Arial, sans-serif", 
      },
    },
    annotations: {
      xaxis: [
        {
          x: "Oct 06 14:00",
          borderColor: "#29335C",
          label: {
            borderColor: "#00E396",
            style: {
              fontSize: "12px",
              color: "#fff",
              background: "#29335C",
            },
            orientation: "horizontal",
            offsetY: 7,
            text: "Annotation Test",
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val: any) {
          return dayjs(val).format("MMM DD HH:mm");
        },
        style: {
          fontSize: "12px",
          color: "#29335C", 
          fontFamily: "Arial, sans-serif",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  

  return (
    <div>
      <ReactApexChart  series={ [{ data: dailySeriesData }]} options={options} type="candlestick" height={500} />
    </div>
  );
};


export default LiveChart;
