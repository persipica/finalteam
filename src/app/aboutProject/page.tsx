import React from 'react'
import styles from './page.module.css'

const features = [
  {
    title: '사용자 등록 및 로그인',
    description:
      '사용자는 이메일과 비밀번호를 사용하여 간편하게 회원가입 및 로그인을 할 수 있습니다. 이를 통해 개인화된 서비스를 제공합니다.',
  },
  {
    title: '상품 등록',
    description:
      '사용자는 직관적인 UI를 통해 간편하게 상품을 등록하고, 사진 및 상세 정보를 추가할 수 있습니다.',
  },
  {
    title: '상품 검색',
    description:
      '다양한 필터와 검색 기능을 통해 원하는 상품을 빠르게 찾을 수 있습니다.',
  },
  // 다른 기능들도 추가 가능
]

export default function WikiPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>프로젝트 소개</h1>
      <div className={styles.intro}>
        <p>
          본 프로젝트는 중고 거래를 효율적으로 진행할 수 있도록 설계된 웹
          애플리케이션입니다. 사용자 친화적인 UI와 다양한 기능을 제공하여,
          판매자와 구매자 모두에게 최적의 환경을 제공합니다.
        </p>
      </div>

      <h2 className={styles.sectionTitle}>기능</h2>
      <ul className={styles.featureList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </li>
        ))}
      </ul>

      <h2 className={styles.sectionTitle}>기술 스택</h2>
      <ul className={styles.techStack}>
        <li>프론트엔드: Next.js, React</li>
        <li>백엔드: Node.js, MongoDB</li>
        <li>인증: OAuth</li>
        <li>스타일링: CSS 모듈</li>
      </ul>

      <h2 className={styles.sectionTitle}>기대 효과</h2>
      <p className={styles.description}>
        이 프로젝트를 통해 사용자는 중고 거래의 편리함과 안전성을 동시에 경험할
        수 있습니다. 판매자는 쉽게 상품을 등록하고, 구매자는 원하는 상품을
        빠르게 찾을 수 있습니다.
      </p>
    </div>
  )
}
