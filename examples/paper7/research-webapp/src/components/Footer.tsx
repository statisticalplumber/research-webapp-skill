import { BookOpen, ExternalLink, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-800 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 academic-gold" />
              <h3 className="text-lg font-semibold text-stone-100">Research Visualization</h3>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Transforming academic research into interactive web experiences that enhance 
              understanding and engagement.
            </p>
          </div>

          {/* Paper Info */}
          <div>
            <h3 className="text-lg font-semibold text-stone-100 mb-4">Paper Information</h3>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-academic-gold mt-0.5">•</span>
                <span>Pre-Lie Structures for Semisimple Lie Algebras</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-academic-gold mt-0.5">•</span>
                <span>Nonassociative Algebras</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-academic-gold mt-0.5">•</span>
                <span>Lie-Admissible Algebras</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-stone-100 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center gap-2 text-stone-400 hover:text-academic-gold transition-colors text-sm">
                  <ExternalLink className="w-4 h-4" />
                  View Original Paper
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-stone-400 hover:text-academic-gold transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  Contact Authors
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            © 2026 Research Visualization. Created from academic paper.
          </p>
          <p className="text-stone-500 text-sm">
            Built with React, Three.js, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
