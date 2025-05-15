import Navigation from '@/components/Navigation'
import Image from 'next/image'

const galleryItems = [
  {
    id: 1,
    title: 'Modern White Privacy Fence',
    description: 'Full privacy vinyl fence installation in Edmonton',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Semi-Privacy Fence with Gate',
    description: 'Custom gate design with semi-privacy panels',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Commercial Fence Installation',
    description: 'Large-scale commercial fence project',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Decorative Garden Fence',
    description: 'Elegant decorative fence with custom post caps',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Pool Enclosure',
    description: 'Safety fence installation around swimming pool',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Custom Gate Design',
    description: 'Bespoke gate design with matching fence',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1000&auto=format&fit=crop',
  },
]

export default function Gallery() {
  return (
    <main>
      <Navigation />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Our Work</h2>
            <p className="mt-4 text-lg text-gray-500">
              Browse through our gallery of completed vinyl fence installations in Edmonton and surrounding areas.
            </p>

            <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {galleryItems.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={item.image} target="_blank" rel="noopener noreferrer">
                      <span className="absolute inset-0" />
                      {item.title}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 