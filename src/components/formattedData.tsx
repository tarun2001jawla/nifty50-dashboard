interface StockData {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }
  
  export const formattedData = (response: { values: StockData[] }) => {
    const formattedStockData: { x: string; y: [string, string, string, string] }[] = [];
    const data = response?.values ?? [];
    console.log("filtered data is from functions is  : ", data);
    for (const value of data) {
      formattedStockData.push({
        x: value.datetime,
        y: [value.open, value.high, value.low, value.close],
      });
    }
    return formattedStockData;
  };
  