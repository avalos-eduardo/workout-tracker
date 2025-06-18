import { quotes } from "./quotes";

export default async function fetchQuote() {
    try {
      const today = new Date();
      const dayOfYear = Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
      );
  
      const quoteIndex = dayOfYear % quotes.length;
      const selectedQuote = quotes[quoteIndex];
  
      return [selectedQuote];
    } catch (error) {
      console.log("Failed to fetch daily quote:", error);
    }
  }
  