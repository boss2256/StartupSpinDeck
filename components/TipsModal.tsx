// components/TipsModal.tsx

import React from 'react';

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md mx-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Elevator Pitch Tips</h2>
        <ul className="list-decimal list-inside text-left space-y-2">
        <li>
            <strong>Hook the Listener:</strong> Start with a compelling question or a bold statement to grab attention.
        </li>
        <li>
            <strong>Introduce Yourself:</strong> Briefly introduce yourself and your role in the company.
        </li>
        <li>
            <strong>Present the Problem:</strong> Clearly state the problem that your target market faces.
        </li>
        <li>
            <strong>Offer the Solution:</strong> Explain how your product or service addresses the problem.
        </li>
        <li>
            <strong>Highlight the Value Proposition:</strong> Emphasize what makes your solution unique and why it's better than alternatives.
        </li>
        <li>
            <strong>Include a Call to Action:</strong> End with a clear next step or request, such as scheduling a meeting or exchanging contact information.
        </li>
        <li>
            <strong>Practice and Refine:</strong> Rehearse your pitch to ensure it's concise, natural, and fits within the time limit.
        </li>
        <li>
            <strong>Be Passionate:</strong> Let your enthusiasm show; passion is contagious and can leave a lasting impression.
        </li>
        </ul>

      </div>
    </div>
  );
};

export default TipsModal;
