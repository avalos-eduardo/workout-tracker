import "./Dashboard.css";
import Heading from "../Common/Heading";
import ProfilePicture from "../Common/ProfilePicture";
import UserGreeting from "../Common/UserGreeting";
import Widget from "../Common/Widget";
import fetchQuote from "../../utils/fetchQuotes";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const date = new Date().toLocaleDateString();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const getQuote = async () => {
      const quotes = await fetchQuote();
      if (quotes && quotes.length > 0) {
        setQuote(quotes[0]);
      }
    };
    getQuote();
  }, []);

  return (
    <>
      <Heading headingTitle={"Dashboard"} />
      <section className="widget-container">
        <div className="profile-container">
          <Widget
            title={<UserGreeting />}
            children={
              <>
                <ProfilePicture />
                <p className="date-title">Today's Date:</p>
                <p className="date">{date}</p>
              </>
            }
          />
        </div>
        <div className="misc-widget-container">
          <div className="workout-widgets">
            <Widget title={"Total Workouts"} />
            <Widget title={"Workouts This Week"} />
          </div>
          <div className="inspiration-widget">
            <Widget title={"Today's Inspirational Quote"}>
              {quote ? (
                <div className="quote-container">
                  <p className="quote-text">"{quote.quoteText}"</p>
                  <p className="quote-author">- {quote.quoteAuthor}</p>
                </div>
              ) : (
                <p>Loading quote...</p>
              )}
            </Widget>
          </div>
        </div>
      </section>
    </>
  );
}
