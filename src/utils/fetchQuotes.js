export default async function fetchQuote() {
    try {
      const response = await fetch("./src/public/quotes.json");
      const data = await response.json();
      const today = new Date();
      const dayOfYear = Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
      );
  
      const quoteIndex = dayOfYear % data.length;
      const selectedQuote = data[quoteIndex];
  
      return [selectedQuote];
    } catch (error) {
      console.log("Failed to fetch daily quote:", error);
    }
  }
  