import Topic from '@/models/topic'
import TopicList from '@/components/TopicList'
import PopularProductsCarousel from '@/components/PopularProductsCarousel'
import connectMongoDB from '@/libs/mongodb'

export default async function Home() {
  try {
    await connectMongoDB()
    
    const topics = await Topic.find().sort({ price: -1 }).limit(5)
    const popularProducts = topics.map(topic => ({
      _id: topic._id.toString(),
      title: topic.title,
      price: topic.price,
      image: topic.image
    }))
    
    return (
      <div>
        {/* 배너 섹션 */}
        <div className="relative h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/banner-image.png')",
              filter: 'sepia(20%)',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-[#D4AF37] text-6xl mb-6 font-['Dancing_Script']">
                  Discover Timeless Treasures
                </h1>
                <p className="text-[#D2B48C] text-xl mb-8 font-light tracking-wide">
                  Curated collection of premium vintage items
                </p>
                <button className="bg-[#D4AF37] text-white px-12 py-3 
                                 hover:bg-[#B8860B] transition-colors duration-300
                                 border border-[#FFD700] tracking-wider">
                  View Collection
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 인기 상품 캐러셀 */}
        <div className="container mx-auto my-8">
          <h2 className="text-2xl font-bold mb-4">인기 상품</h2>
          <PopularProductsCarousel products={popularProducts} />
        </div>

        <TopicList />
      </div>
    )
  } catch (error) {
    console.error('Error loading page:', error)
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          페이지 로딩 중 오류가 발생했습니다
        </h2>
        <p className="text-gray-600">
          잠시 후 다시 시도해주세요
        </p>
      </div>
    )
  }
}