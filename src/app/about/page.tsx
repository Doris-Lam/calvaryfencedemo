'use client'

import Navigation from '@/components/Navigation'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const values = [
  {
    name: 'Owner Operated',
    description: 'We were founded in 2012 when the owner, Jon Machinski, wanted to go back to university to finish his computer science degree. Therefore Jon now combines his love of vinyl fence and computers to bring you a better vinyl fence experience.',
  },
  {
    name: 'Building Trust Through Education',
    description: 'Jon strives to educate his customers on the products available in the market, show the different options, give the pros and cons of each, and come to the solution that is best for you.',
  },
  {
    name: 'Innovative Technologies',
    description: "When Jon comes to your house for the appraisal, you'll notice he brings the latest technology to stream line your experience. Since 2020, Jon has been programming a fence appraisal tool to quickly and accurately calculate your fence quote.",
  },
  {
    name: 'Directly Support Local Families',
    description: 'Cavalry Fence is owned by Jon Machinski, and since 2022 our fences are commonly built with our contractor Rommel Russel. Both Jon and Rommel have growing families. We do this to support our families and we are especially grateful to the Edmonton and surrounding area.',
  },
]

const serviceAreas = [
  'Edmonton',
  'Sherwood Park',
  'St Albert',
  'Leduc',
  'Stony Plain',
  'Spruce Grove',
  'Westlock',
  'Edson',
  'Tofield',
  'Smokey Lake',
  'Gibbons',
  'Ponoka',
  'Beaumont',
  'Fort Saskatchewan',
  'Vegreville',
  'Camrose',
]

export default function About() {
  return (
    <main>
      <Navigation />
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 mt-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Cavalry Fence
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Family Owned and Operated Since 2012 | High Quality Vinyl Product North American Made
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {values.map((value) => (
              <div key={value.name} className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{value.name}</p>
                    <p className="text-sm text-gray-500">{value.description}</p>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center">Our Service Area</h3>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => (
              <div
                key={area}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900">Ready to Get Started?</h3>
          <p className="mt-4 text-lg text-gray-500">
            Contact us today for a free quote on your vinyl fence project.
          </p>
          <div className="mt-8">
            <a
              href="/book-appraisal"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  )
} 