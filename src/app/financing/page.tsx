import Navigation from '@/components/Navigation'
import { CreditCardIcon, BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline'

const financingOptions = [
  {
    name: 'Buy Now, Pay Later',
    description: 'Get your fence installed today and pay over time with flexible payment terms.',
    icon: ClockIcon,
  },
  {
    name: 'Short Term Loans',
    description: 'Quick approval for short-term financing options to fit your budget.',
    icon: BanknotesIcon,
  },
  {
    name: 'Long Term Loans',
    description: 'Extended payment plans for larger projects with competitive rates.',
    icon: CreditCardIcon,
  },
]

export default function Financing() {
  return (
    <main>
      <Navigation />
      <div className="bg-white mt-16">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Flexible Financing Options
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We provide Financing options for your fence through FinanceIT. They have a wide variety available,
              including buy now, pay later terms to short and long term loans at a fair rate.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {financingOptions.map((option) => (
                <div
                  key={option.name}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <div className="flex-shrink-0">
                    <option.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">{option.name}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-gray-50 rounded-lg px-6 py-8 sm:px-10 sm:py-12">
              <div className="mx-auto max-w-3xl">
                <h3 className="text-2xl font-bold text-gray-900">Why Choose FinanceIT?</h3>
                <div className="mt-6 space-y-6">
                  <p className="text-base text-gray-500">
                    We went with FinanceIT chiefly because we have used them ourselves. They offer:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-500">
                        Quick and easy online application process
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-500">
                        Competitive interest rates
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-500">
                        Flexible payment terms
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-500">
                        No prepayment penalties
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Ready to Get Started?</h3>
            <p className="mt-4 text-lg text-gray-500">
              Contact us today to learn more about our financing options and get a free quote.
            </p>
            <div className="mt-8">
              <a
                href="/book-appraisal"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 