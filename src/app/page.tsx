import TopicList from '@/components/TopicList'

import connectMongoDB from '@/libs/mongodb'

export default async function Home() {
  try {
    await connectMongoDB()

    return (
      <div>
        <div className="relative h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/banner-image.png')",
              filter: 'sepia(20%)',
            }}
          ></div>
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
        <p className="text-gray-600">잠시 후 다시 시도해주세요</p>
      </div>
    )
  }
}
