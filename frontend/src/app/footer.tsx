import React from 'react';

export default function Footer() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md font-sans text-sm leading-relaxed text-gray-700 antialiased">
      {/* Header Section */}
      <div className="grid grid-cols-12 gap-4 mb-8">
        <div className="col-span-8">
          <hr className="mb-2 border-gray-300" />
          <div className="flex items-center uppercase tracking-wide text-xs text-gray-600">
            <span>Contact</span>
          </div>
          <hr className="mt-2 border-gray-300" />
        </div>
        <div className="col-span-4">
          <hr className="mb-2 border-gray-300" />
          <div className="flex items-center uppercase tracking-wide text-xs text-gray-600">
            <span>Imprint</span>
          </div>
          <hr className="mt-2 border-gray-300" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <div className="font-medium mb-4">Living the Forest Lab | Reallabor Wald</div>
            <div className="mb-2">Athena Grandis</div>
            <a
              href="mailto:athena.grandis@tu-berlin.de"
              className="inline-block px-3 py-1 rounded bg-gray-100 text-blue-600 hover:bg-gray-200 transition-colors duration-200 mb-4"
            >
              athena.grandis@tu-berlin.de
            </a>
            <div className="mb-2">Sara Reichert</div>
            <a
              href="mailto:s.reichert@tu-berlin.de"
              className="inline-block px-3 py-1 rounded bg-gray-100 text-blue-600 hover:bg-gray-200 transition-colors duration-200"
            >
              s.reichert@tu-berlin.de
            </a>
          </div>
        </div>

        {/* Institution Information */}
        <div className="text-sm text-gray-600 space-y-1">
          <div>Technische Universität Berlin</div>
          <div>Faculty IV Electrical Engineering and Computer Science</div>
          <div>Communication Systems</div>
          <div>EN 1</div>
          <div>Einsteinufer 17</div>
          <div>10587 Berlin</div>
        </div>

        {/* Logos and Copyright */}
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-6">
            {/* TU Berlin Logo */}
            <a
              href="https://www.tu.berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <div className="w-16 h-12 rounded bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center">
                <span className="text-white font-bold text-xs">TU</span>
              </div>
            </a>

            {/* Stiftung Hochschullehre Logo */}
            <a
              href="https://stiftung-hochschullehre.de"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <div className="w-20 h-12 rounded bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-xs">SHL</span>
              </div>
            </a>
          </div>

          <div className="text-center text-sm text-gray-600">
            Copyright:<br />
            Living the Forest Lab | Reallabor Wald
          </div>
        </div>
      </div>
    </div>
  );
}
