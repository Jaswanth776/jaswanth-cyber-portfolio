import CustomCursor from './components/CustomCursor';
import BackgroundEffect from './components/BackgroundEffect';
import SystemStatus from './components/SystemStatus';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnalystMindset from './components/AnalystMindset';
import EngineeringProjects from './components/EngineeringProjects';
import SocCaseStudies from './components/SocCaseStudies';
import NasSystem from './components/NasSystem';
import DetectionPipelines from './components/DetectionPipelines';
import ToolsInAction from './components/ToolsInAction';
import SocCapabilities from './components/SocCapabilities';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen text-gray-200 font-sans selection:bg-neon-green selection:text-black relative">
      <CustomCursor />
      <BackgroundEffect />
      <SystemStatus />
      
      <Navbar />
      <main className="relative z-10 pb-20">
        <Hero />
        <AnalystMindset />
        <EngineeringProjects />
        <NasSystem />
        <SocCaseStudies />
        <DetectionPipelines />
        <ToolsInAction />
        <SocCapabilities />
        <Contact />
      </main>
    </div>
  );
}

export default App;
