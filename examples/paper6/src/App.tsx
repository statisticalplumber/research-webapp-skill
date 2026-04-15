import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { Model } from './components/Model';
import { TuringAnalysis } from './components/TuringAnalysis';
import { WeaklyNonlinearAnalysis } from './components/WeaklyNonlinear';
import { Simulations } from './components/Simulations';
import { Conclusions } from './components/Conclusions';
import { AuthorsSection } from './components/Authors';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <Hero />
      <Introduction />
      <Model />
      <TuringAnalysis />
      <WeaklyNonlinearAnalysis />
      <Simulations />
      <Conclusions />
      <AuthorsSection />
    </div>
  );
}

export default App;
