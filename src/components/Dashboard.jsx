import "../styles/Dashboard.css";
import "../styles/Heading.css";
import "../styles/Widget.css";
import Heading from "./Heading";
import ProfilePicture from "./ProfilePicture";
import UserGreeting from "./UserGreeting";
import Widget from "./Widget";

export default function Dashboard() {
  const date = new Date().toLocaleDateString();

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
            <Widget title={"Today's Inspirational Quote"} />
          </div>
        </div>
      </section>
    </>
  );
}
