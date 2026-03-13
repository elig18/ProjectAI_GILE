export default function Banner() {
  return (
    <div className="relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-r from-violet-700/60 to-indigo-600/60 px-6 py-3 backdrop-blur-md">

      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-[577/310] w-[36rem] bg-gradient-to-r from-pink-400 to-indigo-400 opacity-30"
        />
      </div>

      {/* Texte */}
      <p className="text-sm md:text-base text-white text-center italic font-medium">
        🍒 "Cueillez les meilleurs produits grâce aux avis et l'intelligence artificielle"
        <span className="ml-2 font-semibold not-italic">— Elisabeth G.</span>
      </p>

    </div>
  );
}