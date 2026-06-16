import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Platform } from "./sections/Platform";
import { CoreCapabilities } from "./sections/CoreCapabilities";
import { Applications } from "./sections/Applications";
import { EarlyAccess } from "./sections/EarlyAccess";

function App() {
  return (
    <div className="bg-base-900 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Platform />
        <CoreCapabilities />
        <Applications />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  );
}

export default App;
