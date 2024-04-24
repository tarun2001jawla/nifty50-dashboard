import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import Nifty50Graph from './components/Nifty50Graph';
import StocksTable from './components/Nifty50Table';
import LiveChart from './components/APIChart';
import SearchBar from './components/SearchBar';

interface StockData {
  "All Companies ▲": string;
  "LTP": number;
  "Change %": number;
  "Weightage": number;
  "PE Ratio": number;
  "52W High": number;
  "52W Low": number;
}

interface PriceData {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
}

function App() {
  const [nifty50StocksData, setNifty50StocksData] = useState<StockData[]>([]);
  const [nifty50PriceHistory, setNifty50PriceHistory] = useState<PriceData[]>([]);
  const [symbol, setSymbol] = useState<string>('AMZN'); // Default symbol
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // Fetch stocks data
        const stocksDataResponse = await fetch('/Nifty 50 Stocks List  - Sheet1.csv');
        const stocksDataText = await stocksDataResponse.text();
        const stocksData = Papa.parse(stocksDataText, { header: true }).data;
        setNifty50StocksData(stocksData as StockData[]);

        // Fetch prices data
        const pricesDataResponse = await fetch('/Download Data - INDEX_IN_NATIONAL STOCK EXCHANGE OF INDIA_NIFTY50 (1).csv');
        const pricesDataText = await pricesDataResponse.text();
        const pricesData = Papa.parse(pricesDataText, { header: true }).data;
        setNifty50PriceHistory(pricesData as PriceData[]);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSymbolChange = (newSymbol: string) => {
    
    setSymbol(newSymbol);
  };

  return (
    <div className='container'>
      
      <h1>Nifty 50 Dashboard</h1>
      
      <div>
        <h2>Nifty 50 Stocks</h2>
        <StocksTable data={nifty50StocksData} />
      </div>
      <div className='chart-container'>
        <h2>Nifty 50 Prices in Last 1 Year</h2>
        <Nifty50Graph data={nifty50PriceHistory} />
      </div>
      <div className='live-chart'>
        <h2>Live Chart Using API</h2>
        <div>
      </div>
        <SearchBar onSearch={handleSymbolChange} />
        <LiveChart symbol={symbol} />
      </div>
    </div>
  );
}

export default App;
