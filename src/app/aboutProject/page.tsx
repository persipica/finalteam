import React from 'react'
import styles from './page.module.css' // 스타일을 따로 분리

const features = [
  {
    title: '사용자 등록 및 로그인',
    image: '/images/feature1.png',
    description:
      '사용자는 이메일과 비밀번호를 사용하여 간편하게 회원가입 및 로그인을 할 수 있습니다. 이를 통해 개인화된 서비스를 제공합니다.',
  },
  {
    title: '상품 등록',
    image: '/images/feature2.png',
    description:
      '사용자는 직관적인 UI를 통해 간편하게 상품을 등록하고, 사진 및 상세 정보를 추가할 수 있습니다.',
  },
  {
    title: '상품 검색',
    image: '/images/feature3.png',
    description:
      '다양한 필터와 검색 기능을 통해 원하는 상품을 빠르게 찾을 수 있습니다.',
  },
  // 다른 기능들도 추가 가능
]

export default function Page() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>기능 소개</h1>
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature}>
            <h2 className={styles.featureTitle}>{feature.title}</h2>
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
      </div>
    </div>
  )
}
