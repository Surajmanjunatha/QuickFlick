import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import BlurCircle from './BlurCircle'

const getVideoId = (url) => url.split('v=')[1]

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
      {/* Inline scrollbar CSS */}
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      {/* Main Trailer */}
      <div className="relative mt-6 max-w-[960px] mx-auto">
        <BlurCircle top="-120px" right="-120px" />

        <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
          <iframe
            key={currentTrailer.videoUrl}
            src={`https://www.youtube.com/embed/${getVideoId(
              currentTrailer.videoUrl
            )}`}
            title="Trailer"
            className="w-full h-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Thumbnails with hidden scrollbar */}
      <div className="relative mt-6 max-w-[960px] mx-auto">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10
          bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10
          bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-3">
          {dummyTrailers.map((trailer, index) => {
            const active = trailer.videoUrl === currentTrailer.videoUrl

            return (
              <button
                key={index}
                onClick={() => setCurrentTrailer(trailer)}
                className={`relative min-w-[180px] rounded-lg overflow-hidden
                  border transition-all duration-150
                  ${
                    active
                      ? 'border-primary'
                      : 'border-white/10 hover:border-white/40'
                  }`}
              >
                <img
                  src={trailer.image}
                  alt="Trailer thumbnail"
                  className="w-full h-full object-cover"
                />
                {!active && (
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-150" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrailersSection
