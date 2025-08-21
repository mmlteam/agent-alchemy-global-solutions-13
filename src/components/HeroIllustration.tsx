import { SplineScene } from '@/components/ui/splite'

export function HeroIllustration() {
  return (
    <div className="absolute top-[50px] -left-4 lg:-left-8 right-0 bottom-0 w-[calc(100%+2rem)] lg:w-[calc(100%+4rem)] h-full">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full object-contain scale-110 lg:scale-105"
      />
    </div>
  )
}