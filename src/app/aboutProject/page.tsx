import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

const features = [
  {
    title: '로그인',
    id: 'login',
    description:
      '사용자는 로그인 페이지에서 구글 계정 또는 깃허브 계정을 통해 로그인 할 수 있습니다. ',
    image: '/login-image.png',
  },
  {
    title: '상품 등록',
    id: 'product-registration',
    description:
      '사용자는 직관적인 UI를 통해 간편하게 상품을 등록하고, 사진 및 상세 정보를 추가할 수 있습니다.',
    image: '/product-registration-image.png',
  },
  {
    title: '상품 상세페이지',
    id: 'product-detail',
    description:
      '사용자는 상품 상세페이지에서 자신이 등록한 상품이라면 수정, 삭제기능과 상품의 판매 상태를 설정할 수 있으며, 자신이 등록하지 않은 상품에 대해서는 찜하기 기능을 사용할 수 있습니다.',
    image: '/product-detail-image.png',
  },
  {
    title: '댓글',
    id: 'comment',
    description:
      '사용자는 상품 상세페이지 하단의 댓글 영역에 댓글을 작성할 수 있으며, 자신이 등록한 댓글에 대해서는 수정과 삭제 기능을 이용할 수 있습니다. 또한 자신의 상품에 댓글을 단 경우라면 판매자 라고 표시됩니다. 해당 댓글 기능 통해 판매자와 구매자간의 소통이 가능하며 이를 바탕으로 거래를 진행할 수 있습니다.',
    image: '/comment-image.png',
  },
  {
    title: '마이페이지',
    id: 'mypage',
    description:
      '사용자는 마이페이지에서 자신의 간단한 정보와 자신이 등록한 상품, 판매한 상품, 찜한 상품을 리스트형식으로 확인할 수 있습니다.',
    image: '/mypage-image.png',
  },
  {
    title: '상품 목록',
    id: 'product-list',
    description:
      '사용자는 상품 목록에서 해당 사이트에 등록된 상품을 살펴 볼 수 있으며, 상단의 필터 기능을 이용해 상품을 카테고리별, 가격순, 최신순으로 정렬할 수 있고 옆의 검색바를 이용하여 상품의 정확한 검색을 할 수 있습니다.',
    image: '/product-list-image.png',
  },
  {
    title: '게시판',
    id: 'board',
    description:
      '사용자는 사이드바의 게시판 버튼을 통해 게시판 페이지로 이동할 수 있으며, 해당 게시판에는 구매한 상품의 리뷰나 일상적인 이야기등 자신이 하고싶은 말을 자유롭게 적을 수 있습니다.',
    image: '/board-image.png',
  },
  {
    title: '문의 하기',
    id: 'contact',
    description:
      '사용자는 사이드바의 문의하기 버튼을 통해 문의하기 페이지로 이동할 수 있으며, 해당 입력 폼에 문의 사항이나 건의 사항을 입력하여 전달할 수 있습니다.',
    image: '/contact-image.png',
  },
]

export default function WikiPage() {
  return (
    <div className={styles.page}>
      <section id="intro" className={styles.section}>
        <h1 className={styles.sectionTitle}>프로젝트 소개</h1>
      </section>

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
          <li>
            <a href="#midterm">4. 중간고사 페이지</a>
          </li>
        </ul>
      </div>

      <section id="intro" className={styles.section}>
        <h1 className={styles.sectionTitle}>1. 소개</h1>
        <p className={styles.description}>
          이 프로젝트는 중고 거래 플랫폼으로, 학교 학생들이 손쉽게 상품을 사고
          팔게 하기위해 제작되었습니다. 해당 사이트는 로그인, 상품등록, 찜하기,
          마이페이지등 다양한 기능을 제공하기 위해 여러 기술을 적용하였습니다.
        </p>

        <div className={styles.videoWrapper}>
          <video controls className={styles.projectVideo}>
            <source src="/intro-video.mp4" type="video/mp4" />
            해당 브라우저는 동영상을 지원하지 않습니다.
          </video>
        </div>
      </section>

      <section id="features" className={styles.section}>
        <h1 className={styles.sectionTitle}>2. 기능</h1>
        {features.map((feature, index) => (
          <div key={feature.id} id={feature.id} className={styles.featureItem}>
            <h2 className={styles.featureTitle}>
              2.{index + 1} {feature.title}
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
