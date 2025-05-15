'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const fenceStyles = [
  { id: 'full-privacy', name: 'Full Privacy', price: 45 },
  { id: 'semi-privacy', name: 'Semi Privacy', price: 40 },
  { id: 'decorative', name: 'Decorative', price: 35 },
]

const colors = [
  { id: 'white', name: 'White' },
  { id: 'tan', name: 'Tan' },
  { id: 'gray', name: 'Gray' },
]

const schema = z.object({
  length: z.number().min(1, 'Length must be greater than 0'),
  height: z.number().min(4, 'Height must be at least 4 feet').max(8, 'Height must be at most 8 feet'),
  style: z.string(),
  color: z.string(),
  gates: z.number().min(0, 'Number of gates cannot be negative'),
})

type FormData = z.infer<typeof schema>

export default function FenceCalculator() {
  const [totalPrice, setTotalPrice] = useState(0)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      length: 0,
      height: 6,
      style: 'full-privacy',
      color: 'white',
      gates: 0,
    },
  })

  // Reset form on mount
  useEffect(() => {
    reset({
      length: 0,
      height: 6,
      style: 'full-privacy',
      color: 'white',
      gates: 0,
    })
    setTotalPrice(0)
  }, [reset])

  const onSubmit = (data: FormData) => {
    const selectedStyle = fenceStyles.find(style => style.id === data.style)
    if (!selectedStyle) return

    const basePrice = data.length * selectedStyle.price
    const gatePrice = data.gates * 500 // $500 per gate
    const heightMultiplier = data.height / 6 // Base height is 6 feet

    setTotalPrice(basePrice * heightMultiplier + gatePrice)
  }

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Fence Quote Calculator</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">
              Fence Length (feet)
            </label>
            <input
              type="number"
              id="length"
              {...register('length', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            />
            {errors.length && (
              <p className="mt-1 text-sm text-red-600">{errors.length.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Fence Height (feet)
            </label>
            <input
              type="number"
              id="height"
              {...register('height', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            />
            {errors.height && (
              <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700">
              Fence Style
            </label>
            <select
              id="style"
              {...register('style')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            >
              {fenceStyles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name} (${style.price}/ft)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <select
              id="color"
              {...register('color')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            >
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="gates" className="block text-sm font-medium text-gray-700">
              Number of Gates
            </label>
            <input
              type="number"
              id="gates"
              {...register('gates', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            />
            {errors.gates && (
              <p className="mt-1 text-sm text-red-600">{errors.gates.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate Quote
          </button>
        </form>

        {totalPrice > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium text-gray-900">Estimated Total</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              ${totalPrice.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              This is an estimate. Final price may vary based on site conditions and specific requirements.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 