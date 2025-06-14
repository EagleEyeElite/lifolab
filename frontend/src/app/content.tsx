export default function LivingForestLab() {
  return (
    <div className="max-w-full w-full p-6 bg-gray-50 font-sans text-gray-800">
      <hr className="border-gray-300" />
      <span className="text-sm text-gray-600 mb-6 block">About ✏️</span>
      <hr className="border-gray-300" />
      <div className="flex gap-6 items-start">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-3xl font-normal text-gray-900 mb-6 leading-tight">Living the Forest Lab</h1>

          <div className="text-lg leading-relaxed text-gray-700 space-y-6">
            <p>
              "Living the Forest Lab" is a research initiative funded by the Stiftung Innovation in der Hochschullehre, located at TU Berlin's Faculty IV Electrical Engineering and Computer Science, Department of Communications Systems.
            </p>

            <p>
              This project aims to promote transdisciplinary teaching through experimental and open-ended projects that develop prototype solutions for forest protection. By bridging open-source, maker, and open hardware communities with students, labs, experts, and the public, the project addresses the ecological, social, and economic functions of forests. Recognizing the critical role forests play in biodiversity and climate regulation, the project emphasizes the importance of forest protection in mitigating climate change and preserving ecosystems. By using a living lab approach, the project integrates scientific research with real-world applications to tackle wicked problems on a local scale, encouraging communities to exchange knowledge and develop prototypes together.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 w-64">
          <div className="space-y-1">
            <hr className="border-gray-300" />
            <a href="why-the-forest" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Why the forest?</a>
            <hr className="border-gray-300" />
            <a href="what-is-a-living-lab" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">What is a "Living Lab"?</a>
            <hr className="border-gray-300" />

            <div className="py-2"></div>

            <hr className="border-gray-300" />
            <a href="teaching" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Teaching</a>
            <hr className="border-gray-300" />
            <a href="research" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Research</a>
            <hr className="border-gray-300" />

            <div className="py-2"></div>

            <hr className="border-gray-300" />
            <a href="stiftung-innovation-in-der-hochschullehre" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Stiftung Innovation in der Hochschuhllehre</a>
            <hr className="border-gray-300" />
            <a href="technical-university-berlin" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Technical University Berlin</a>
            <hr className="border-gray-300" />
          </div>
        </div>

        <div className="flex-shrink-0 w-80">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
            alt="Forest landscape"
            className="w-full h-64 object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};