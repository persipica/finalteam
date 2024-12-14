import React from 'react'
import styles from './wikiPage.module.css'

const features = [
  {
    title: '로그인',
    id: 'login',
    description:
      '사용자는 이메일과 비밀번호를 사용하여 간편하게 회원가입 및 로그인을 할 수 있습니다. 이를 통해 개인화된 서비스를 제공합니다.',
  },
  {
    title: '상품 등록',
    id: 'product-registration',
    description:
      '사용자는 직관적인 UI를 통해 간편하게 상품을 등록하고, 사진 및 상세 정보를 추가할 수 있습니다.',
  },
]

export default function WikiPage() {
  return (
    <div className={styles.page}>
      {/* 목차 */}
      <div className={styles.toc}>
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
        </ul>
      </div>

      {/* 소개 섹션 */}
      <section id="intro" className={styles.section}>
        <h1 className={styles.sectionTitle}>1. 소개</h1>
        <p className={styles.description}>
          이 프로젝트는 중고 거래 플랫폼으로, 사용자가 손쉽게 상품을 등록하고
          거래할 수 있도록 설계되었습니다. 다양한 기능을 통해 사용자 경험을
          극대화합니다.
        </p>
      </section>

      {/* 기능 섹션 */}
      <section id="features" className={styles.section}>
        <h1 className={styles.sectionTitle}>2. 기능</h1>
        {features.map((feature, index) => (
          <div key={feature.id} id={feature.id} className={styles.featureItem}>
            <h2 className={styles.featureTitle}>
              2.{index + 1} {feature.title}
            </h2>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
