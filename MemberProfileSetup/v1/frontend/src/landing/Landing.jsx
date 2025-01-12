import Header from "./Header.jsx";
import Chatbot from "./chatbot.jsx";
import { BACKEND_URL } from "../config.js";

function Landing() {
  return (
    <div
      style={{ backgroundColor: "white", minHeight: "100vh", width: "100vw" }}
    >
      <Header />
      <Chatbot />
    </div>
  );
}

export default Landing;
