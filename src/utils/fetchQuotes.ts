import { Quote, quotes } from "./quotes";

export default function fetchQuote():Quote {
      const today = new Date();
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
      );
  
      const quoteIndex = dayOfYear % quotes.length;
      const selectedQuote = quotes[quoteIndex];
  
      return selectedQuote;
  }
  