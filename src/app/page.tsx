'use client'

import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon, SparklesIcon, ArrowPathIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const features = [
  {
    name: 'Low Maintenance Vinyl Fence',
    description: 'Your new vinyl fence will continue to look great throughout the years with minimal cleaning.',
    icon: CheckCircleIcon,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Great Value and Warranty',
    description: 'VEKA Vinyl Fence provides a limited lifetime warranty to ensure you love your fence for years to come.',
    icon: ShieldCheckIcon,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'North American Made Vinyl Fence',
    description: 'VEKA\'s north american made vinyl fence is of the highest quality, thoroughly inspected to ensure durability.',
    icon: CurrencyDollarIcon,
    color: 'from-purple-500 to-purple-600',
  },
]

const stats = [
  { id: 1, name: 'Years of Experience', value: '12+' },
  { id: 2, name: 'Projects Completed', value: '1000+' },
  { id: 3, name: 'Happy Customers', value: '98%' },
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    title: 'Modern White Privacy Fence',
    desc: 'Clean lines, lasting beauty',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
    title: 'Semi-Privacy Fence',
    desc: 'Perfect balance of privacy and style',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1000&auto=format&fit=crop',
    title: 'Custom Gate Design',
    desc: 'Tailored to your style',
  },
]

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useSpring(1, { stiffness: 100, damping: 30 })

  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const modalRef = useRef(null)

  // Keyboard navigation for modal
  useEffect(() => {
    if (!modalOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setModalOpen(false)
      if (e.key === 'ArrowRight') setModalIndex((i) => (i + 1) % galleryImages.length)
      if (e.key === 'ArrowLeft') setModalIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [modalOpen])

  return (
    <main className="bg-gradient-to-b from-white via-blue-50 to-white">
      <Navigation />
      
      {/* Hero section */}
      <div className="relative isolate overflow-hidden min-h-screen" ref={ref}>
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),theme(colors.white))]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        />
        <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:px-8 lg:py-40 items-center">
          <div className="flex flex-col justify-center h-full px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                  ref={titleRef}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute -top-4 -left-4 text-blue-600"
                    whileHover={{ rotate: 360 }}
                  >
                    <SparklesIcon className="h-8 w-8" />
                  </motion.div>
                  <motion.h1 
                    className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    Vinyl Fence Edmonton
                  </motion.h1>
                  <motion.p 
                    className="mt-6 text-lg leading-8 text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Have Edmonton's Vinyl Fence Installation Experts get to work on your project. A vinyl fence Edmonton specialized company. So book your free Quote today!
                  </motion.p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/quote"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center px-8 py-3 font-bold tracking-wide text-white transition-all duration-200 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden"
                      >
                        <span className="relative z-10">Book Now</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Link 
                        href="/contact" 
                        className="group text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
                      >
                        Contact Us <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          {/* GALLERY IN HERO SECTION (RIGHT SIDE) */}
          <div className="flex items-start justify-center w-full h-full px-4 -mt-20">
            <div className="relative w-full max-w-xl flex justify-center items-center">
              {/* Bubbles absolutely positioned within the gallery wrapper */}
              <div className="pointer-events-none absolute inset-0 z-0">
                {/* 12+ animated bubbles for extra depth and variety */}
                <motion.div className="absolute -top-32 left-1/5 w-72 h-72 bg-gradient-to-tr from-blue-300 via-blue-100 to-white rounded-full blur-2xl opacity-60 z-0" animate={{ y: [0, 40, 0], x: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} />
                <motion.div className="absolute -bottom-36 right-1/5 w-64 h-64 bg-gradient-to-br from-blue-200 via-blue-50 to-white rounded-full blur-2xl opacity-50 z-0" animate={{ y: [0, -30, 0], x: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }} />
                <motion.div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-full blur-2xl opacity-40 z-0" animate={{ y: [0, 25, 0], x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }} />
                <motion.div className="absolute top-1/3 right-10 w-40 h-40 bg-gradient-to-br from-blue-200 via-blue-100 to-white rounded-full blur-2xl opacity-50 z-0" animate={{ y: [0, 20, 0], x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }} />
                <motion.div className="absolute top-16 left-16 w-32 h-32 bg-gradient-to-br from-blue-200 via-blue-50 to-white rounded-full blur-2xl opacity-40 z-0" animate={{ y: [0, 18, 0], x: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut' }} />
                <motion.div className="absolute bottom-16 left-1/3 w-40 h-40 bg-gradient-to-br from-blue-300 via-blue-100 to-white rounded-full blur-2xl opacity-35 z-0" animate={{ y: [0, -15, 0], x: [0, 18, 0] }} transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut' }} />
                <motion.div className="absolute top-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-full blur-2xl opacity-40 z-0" animate={{ y: [0, 12, 0], x: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }} />
                <motion.div className="absolute bottom-1/4 right-24 w-32 h-32 bg-gradient-to-br from-blue-200 via-blue-50 to-white rounded-full blur-2xl opacity-30 z-0" animate={{ y: [0, 14, 0], x: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }} />
                <motion.div className="absolute top-10 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-100 via-blue-200 to-white rounded-full blur-2xl opacity-30 z-0" animate={{ y: [0, 10, 0], x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} />
                <motion.div className="absolute bottom-10 left-10 w-28 h-28 bg-gradient-to-br from-blue-200 via-blue-100 to-white rounded-full blur-2xl opacity-25 z-0" animate={{ y: [0, -12, 0], x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }} />
                <motion.div className="absolute top-1/5 left-1/2 w-20 h-20 bg-gradient-to-br from-blue-100 via-blue-200 to-white rounded-full blur-2xl opacity-35 z-0" animate={{ y: [0, 8, 0], x: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }} />
                <motion.div className="absolute bottom-1/5 right-1/2 w-24 h-24 bg-gradient-to-br from-blue-200 via-blue-100 to-white rounded-full blur-2xl opacity-30 z-0" animate={{ y: [0, 14, 0], x: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }} />
                <motion.div className="absolute top-1/6 left-1/6 w-16 h-16 bg-gradient-to-br from-blue-100 via-blue-200 to-white rounded-full blur-2xl opacity-30 z-0" animate={{ y: [0, 6, 0], x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} />
                {/* Soft radial gradient background */}
                <div className="absolute inset-0 z-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at 60% 40%, rgba(147,197,253,0.18) 0%, rgba(255,255,255,0.0) 70%)'}} />
              </div>
              <div className="w-full max-w-xl bg-gradient-to-br from-blue-100/80 via-white/80 to-blue-200/60 rounded-3xl shadow-2xl border border-blue-100/60 overflow-hidden relative z-10 glassmorphism">
                <div className="bg-white/80 rounded-2xl overflow-hidden m-4 shadow-lg ring-1 ring-blue-100/40">
                  <div className="flex bg-blue-50/80 ring-1 ring-blue-100/40 rounded-t-2xl">
                    <div className="-mb-px flex text-sm font-medium leading-6 text-blue-700 w-full">
                      <div className="border-b border-r border-b-blue-200 border-r-blue-100 bg-blue-100/60 px-4 py-2 text-blue-800 rounded-tl-2xl font-semibold">
                        Vinyl Fence Gallery
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {galleryImages.slice(0,2).map((img, i) => (
                        <motion.div
                          key={img.title}
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                          className="relative group overflow-hidden rounded-xl cursor-pointer"
                          onClick={() => { setModalIndex(i); setModalOpen(true); }}
                        >
                          <motion.img
                            src={img.src}
                            alt={img.title}
                            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                          />
                          {/* Glowing border on hover */}
                          <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            initial={{ boxShadow: '0 0 0 0 #3b82f6' }}
                            whileHover={{ boxShadow: '0 0 24px 4px #3b82f6' }}
                            transition={{ duration: 0.3 }}
                          />
                          {/* Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-blue-300/60 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="absolute bottom-0 left-0 right-0 p-4 text-gray-900"
                          >
                            <h3 className="text-lg font-semibold drop-shadow-lg">{img.title}</h3>
                            <p className="text-sm text-gray-600 drop-shadow">{img.desc}</p>
                          </motion.div>
                        </motion.div>
                      ))}
                      {/* Bottom row: full-width image */}
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.3 }}
                        className="relative group overflow-hidden rounded-xl cursor-pointer col-span-2 mt-4"
                        onClick={() => { setModalIndex(2); setModalOpen(true); }}
                      >
                        <motion.img
                          src={galleryImages[2].src}
                          alt={galleryImages[2].title}
                          className="w-full aspect-[8/3] object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                        />
                        {/* Glowing border on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          initial={{ boxShadow: '0 0 0 0 #3b82f6' }}
                          whileHover={{ boxShadow: '0 0 24px 4px #3b82f6' }}
                          transition={{ duration: 0.3 }}
                        />
                        {/* Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-blue-300/60 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute bottom-0 left-0 right-0 p-4 text-gray-900"
                        >
                          <h3 className="text-lg font-semibold drop-shadow-lg">{galleryImages[2].title}</h3>
                          <p className="text-sm text-gray-600 drop-shadow">{galleryImages[2].desc}</p>
                        </motion.div>
                      </motion.div>
                    </div>
                    <motion.a
                      href="/gallery"
                      whileHover={{ scale: 1.08, boxShadow: '0 0 32px 8px #60a5fa' }}
                      transition={{ duration: 0.3 }}
                      className="block mx-auto mt-8 w-max px-8 py-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold text-lg shadow-lg ring-2 ring-blue-200/60 hover:bg-blue-500 hover:ring-blue-400/80 transition-all duration-300 animate-pulse"
                    >
                      View Full Gallery
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Trusted by Homeowners Across Edmonton
            </motion.h2>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                className="flex flex-col bg-white/50 p-8 backdrop-blur-sm"
              >
                <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-base font-semibold leading-7 text-blue-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose Us?
            </motion.h2>
            <motion.p 
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Trusted Vinyl Fence Installer in Edmonton
            </motion.p>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Family Owned and Operated Since 2012 | High Quality Vinyl Product North American Made
            </motion.p>
          </motion.div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={false}
                  whileHover={{ scale: 1.1 }}
                />
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className={`h-5 w-5 flex-none text-${feature.color.split('-')[1]}-600 group-hover:scale-110 transition-transform duration-300`} aria-hidden="true" />
                  </motion.div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 relative z-10">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
                <AnimatePresence>
                  {hoveredFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center justify-center"
                      >
                        <ArrowPathIcon className="h-5 w-5 text-blue-600" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Modal Image Viewer */}
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={setModalOpen} initialFocus={modalRef}>
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0 bg-black/60">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
                <button
                  ref={modalRef}
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md focus:outline-none"
                  aria-label="Close"
                >
                  <span className="text-2xl">×</span>
                </button>
                <img
                  src={galleryImages[modalIndex].src}
                  alt={galleryImages[modalIndex].title}
                  className="w-full h-96 object-cover rounded-t-2xl"
                />
                <div className="p-6 text-left">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{galleryImages[modalIndex].title}</h3>
                  <p className="text-gray-600">{galleryImages[modalIndex].desc}</p>
                </div>
                {/* Navigation Arrows */}
                <button
                  onClick={() => setModalIndex((modalIndex - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md focus:outline-none"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={() => setModalIndex((modalIndex + 1) % galleryImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md focus:outline-none"
                  aria-label="Next"
                >
                  ›
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </main>
  )
}
