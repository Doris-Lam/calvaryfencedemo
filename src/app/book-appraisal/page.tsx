import Navigation from '@/components/Navigation'
import FenceCalculator from '@/components/FenceCalculator'

export default function BookAppraisal() {
  return (
    <main>
      <Navigation />
      <div className="bg-gray-50 mt-12">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Get Your Free Fence Quote
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Use our calculator to get an instant estimate for your vinyl fence project.
              For a more accurate quote, schedule an on-site consultation with our experts.
            </p>
          </div>
        </div>
      </div>
      <FenceCalculator />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Need a More Accurate Quote?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Our experts can visit your property to provide a detailed quote based on your specific needs.
            </p>
            <div className="mt-8">
              <a
                href="/quote"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
              >
                Schedule On-Site Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 