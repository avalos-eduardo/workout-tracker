import "./Dashboard.css";
import Heading from "../Common/Heading";
import ProfilePicture from "../Common/ProfilePicture";
import UserGreeting from "../Common/UserGreeting";
import Widget from "../Common/Widget";
import fetchQuote from "../../utils/fetchQuotes";
import { useWorkoutContext } from "../../contexts/workoutContext";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const date = new Date().toLocaleDateString();
  const [quote, setQuote] = useState(null);
  const { state } = useWorkoutContext();
  const workoutsThisWeek = state.workoutHistory.filter((workout) =>
    isDateInCurrentWeek(workout.dateCompleted)
  ).length;

  useEffect(() => {
    const getQuote = async () => {
      const quotes = await fetchQuote();
      if (quotes && quotes.length > 0) {
        setQuote(quotes[0]);
      }
    };
    getQuote();
  }, []);

  function isDateInCurrentWeek(dateString) {
    const workoutDate = new Date(dateString);
    const now = new Date();

    // Set the start of the week to Sunday
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Set end of week (today + 1 day)
    const endOfWeek = new Date(now);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    endOfWeek.setHours(0, 0, 0, 0);

    return workoutDate >= startOfWeek && workoutDate < endOfWeek;
  }

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
            <Widget title={"Total Workouts"}>
              <div className="workouts-count-container">
                <p>{state.workoutHistory.length}</p>
              </div>
            </Widget>
            <Widget title={"Workouts This Week"}>
              <div className="workouts-count-container">
                <p>{workoutsThisWeek}</p>
              </div>
            </Widget>
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
