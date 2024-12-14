import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

const features = [
  {
    title: '로그인',
    id: 'login',
    description:
      '사용자는 로그인 페이지에서 구글 계정 또는 깃허브 계정을 통해 로그인 할 수 있습니다. ',
    image: '/images/login-image.jpg', // 여기에 적절한 이미지 경로 추가
  },
  {
    title: '상품 등록',
    id: 'product-registration',
    description:
      '사용자는 직관적인 UI를 통해 간편하게 상품을 등록하고, 사진 및 상세 정보를 추가할 수 있습니다.',
    image: '/images/product-registration-image.jpg', // 여기에 적절한 이미지 경로 추가
  },
  {
    title: '상품 상세페이지',
    id: 'product-detail',
    description:
      '사용자는 상품 상세페이지에서 자신이 등록한 상품이라면 수정, 삭제기능과 상품의 판매 상태를 설정할 수 있으며, 자신이 등록하지 않은 상품에 대해서는 찜하기 기능을 사용할 수 있습니다.',
    image: '/images/product-detail-image.jpg', // 여기에 적절한 이미지 경로 추가
  },
  {
    title: '댓글',
    id: 'comment',
    description:
      '사용자는 상품 상세페이지 하단의 댓글 영역에 댓글을 작성할 수 있으며, 자신이 등록한 댓글에 대해서는 수정과 삭제 기능을 이용할 수 있습니다. 또한 자신의 상품에 댓글을 단 경우라면 판매자 라고 표시됩니다. 해당 댓글 기능 통해 판매자와 구매자간의 소통이 가능하며 이를 바탕으로 거래를 진행할 수 있습니다.',
    image: '/images/comment-image.jpg', // 여기에 적절한 이미지 경로 추가
  },
  {
    title: '마이페이지',
    id: 'mypage',
    description:
      '사용자는 마이페이지에서 자신의 간단한 정보와 자신이 등록한 상품, 판매한 상품, 찜한 상품을 리스트형식으로 확인할 수 있습니다.',
    image: '/images/mypage-image.jpg', // 여기에 적절한 이미지 경로 추가
  },
]

export default function WikiPage() {
  return (
    <div className={styles.page}>
      <section id="intro" className={styles.section}>
        <h1 className={styles.sectionTitle}>프로젝트 소개</h1>
      </section>

      {/* 목차 */}
      <div id="toc" className={styles.toc}>
        <h2>목차</h2>
        <ul>
          <li>
            <a href="#intro">1. 소개</a>
          </li>
          <li>
            <a href="#features">2. 기능</a>
            <ul>
              {features.map((feature, index) => (
                <li key={feature.id}>
                  <a href={`#${feature.id}`}>
                    2.{index + 1} {feature.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a href="#stacks">3. 사용된 기술</a>
          </li>
        </ul>
      </div>

      {/* 소개 섹션 */}
      <section id="intro" className={styles.section}>
        <h1 className={styles.sectionTitle}>1. 소개</h1>
        <p className={styles.description}>
          이 프로젝트는 중고 거래 플랫폼으로, 학교 학생들이 손쉽게 상품을 사고
          팔게 하기위해 제작되었습니다. 해당 사이트는 로그인, 상품등록, 찜하기,
          마이페이지등 다양한 기능을 제공하기 위해 여러 기술을 적용하였습니다.
        </p>
      </section>

      {/* 기능 섹션 */}
      <section id="features" className={styles.section}>
        <h1 className={styles.sectionTitle}>2. 기능</h1>
        {features.map((feature, index) => (
          <div key={feature.id} id={feature.id} className={styles.featureItem}>
            <h2 className={styles.featureTitle}>
              2.{index + 1} {feature.title}
              {/* 각 제목 옆에 숫자 클릭 시 목차로 돌아가는 링크 추가 */}
              <a href="#toc" className={styles.backToTopLink}>
                {index + 1}
              </a>
            </h2>
            <div className={styles.featureContent}>
              <img
                src={feature.image}
                alt={feature.title}
                className={styles.featureImage}
              />
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="stacks" className={styles.section}>
        <h1 className={styles.sectionTitle}>3. 사용된 기술</h1>
        <p className={styles.description}>
          next.js, mongoDB, cloudinary, CSS, Oauth
        </p>
      </section>

      <section id="midterm" className={styles.section}>
        <h1 className={styles.sectionTitle}>4. 중간고사페이지</h1>
        <p className={styles.description}>
          중간고사때 발표했던 팀프로젝트 페이지 입니다.
        </p>
        <Link href="https://teammid.vercel.app/">
          https://teammid.vercel.app/
        </Link>
      </section>
    </div>
  )
}
