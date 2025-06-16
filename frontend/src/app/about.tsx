import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/sectionHeader";
import { Pencil } from "lucide-react";
import ExampleForest from '@public/exampleForest.jpeg'

export default function About() {
  return (
    <div className="flex justify-start w-full">
      <div className="w-full">
        <div className="px-[1.6rem] py-[1.6rem] space-y-6">
          {/* About section header */}
          <div className="mb-8">
            <SectionHeader icon={Pencil}>About</SectionHeader>
          </div>

          {/* Main content flex container */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Main content - Living the Forest Lab */}
            <div className="flex-1">
              <h1 className="text-5xl font-normal leading-none text-black/85 tracking-normal mb-8 inline-block">
                Living the Forest Lab
              </h1>

              <div className="text-lg leading-tight text-black opacity-85 font-normal text-justify">
                <p className="mb-6">
                  "Living the Forest Lab" is a research initiative funded by the Stiftung Innovation in der Hochschullehre,
                  located at TU Berlin's Faculty IV Electrical Engineering and Computer Science, Department of Communications Systems.
                </p>

                <p>
                  This project aims to promote transdisciplinary teaching through experimental and open-ended projects that
                  develop prototype solutions for forest protection. By bridging open-source, maker, and open hardware communities
                  with students, labs, experts, and the public, the project addresses the ecological, social, and economic functions
                  of forests. Recognizing the critical role forests play in biodiversity and climate regulation, the project
                  emphasizes the importance of forest protection in mitigating climate change and preserving ecosystems. By using
                  a living lab approach, the project integrates scientific research with real-world applications to tackle wicked
                  problems on a local scale, encouraging communities to exchange knowledge and develop prototypes together.
                </p>
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex-1 lg:w-80">
              <div className="divide-y divide-black/75">
                <Link href="#" className="block py-2 text-black">Why the forest?</Link>
                <Link href="#" className="block py-2 text-black">What is a "Living Lab"?</Link>
                <div className="py-3"></div>
                <Link href="#" className="block py-2 text-black text-lg">Teaching</Link>
                <Link href="#" className="block py-2 text-black text-lg">Research</Link>
                <div className="py-3"></div>
                <Link href="#" className="block py-2 text-black text-lg">Stiftung Innovation in der Hochschullehre</Link>
                <Link href="#" className="block py-2 text-black text-lg">Technical University Berlin</Link>
              </div>
            </div>

            {/* Image */}
            <Image
              src={ExampleForest}
              alt="Forest landscape"
              width={500}
              height={400}
              className="flex-1 lg:w-80 w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}