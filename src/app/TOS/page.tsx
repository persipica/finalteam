'use client';
import React, { useState } from 'react';

const TOSPage = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">서비스 이용약관</h1>

      <div className="space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">제1조(목적)</h2>
            <button
              onClick={() => toggleSection('section1')}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {openSections['section1'] ? '접기' : '자세히 보기'}
            </button>
          </div>
          {openSections['section1'] && (
            <div className="mt-4 space-y-2">
              <p>
                1. 본 약관은 중고나가 운영하는 인터넷 사이트
                &apos;https://finalteam.vercel.app/&apos;(이하
                &apos;사이트&apos;라 합니다) 전자상거래 서비스와 관련하여
                당사자의 권리 의무 및 책임사항을 규정하는 것을 목적으로 합니다.
              </p>
              <p>
                2. PC통신, 무선 등을 이용하는 전자상거래에 대하여도 그 성질에
                반하지 않는 한 본 약관을 준용합니다.
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">제2조(정의)</h2>
            <button
              onClick={() => toggleSection('section2')}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {openSections['section2'] ? '접기' : '자세히 보기'}
            </button>
          </div>
          {openSections['section2'] && (
            <div className="mt-4 space-y-2">
              <p className="mb-2">
                본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
              </p>
              <p>
                1. &apos;회사&apos;라 함은, 중고나이 재화 또는 용역을 제공하기
                위하여 컴퓨터 등 정보통신설비를 이용하여 상품을 거래할 수 있도록
                설정한 가상의 영업장을 운영하는 주체를 말하며, 아울러
                &apos;https://finalteam.vercel.app/&apos;을 통해 제공되는
                전자상거래 관련 서비스의 의미로도 사용합니다.
              </p>
              <p>
                2. &apos;오픈마켓&apos;이라 함은, &apos;회사&apos;가
                &apos;사이트&apos;를 통하여 &apos;이용자&apos;간 상품 거래가
                이루어질 수 있는 사이버 거래장소를 온라인으로 제공하는 서비스 및
                관련 부가 서비스 일체를 말합니다.
              </p>
              <p>
                3. 본 조에서 정의되지 않은 본 약관상의 용어는 일반적인
                거래관행에 따라 해석합니다.
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">제3조(약관 외 준칙)</h2>
            <button
              onClick={() => toggleSection('section3')}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {openSections['section3'] ? '접기' : '자세히 보기'}
            </button>
          </div>
          {openSections['section3'] && (
            <div className="mt-4 space-y-2">
              <p>
                본 약관에서 정하지 아니한 사항은 법령 또는 &apos;회사&apos;가
                정한 서비스의 개별 약관, 운영정책 및 규칙(이하
                &apos;세부지침&apos;이라 합니다)의 규정에 따릅니다. 또한 본
                약관과 세부지침이 충돌할 경우에는 세부지침이 우선합니다.
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">제4조(약관의 명시 및 개정)</h2>
            <button
              onClick={() => toggleSection('section4')}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {openSections['section4'] ? '접기' : '자세히 보기'}
            </button>
          </div>
          {openSections['section4'] && (
            <div className="mt-4 space-y-2">
              <p>
                1. &apos;회사&apos;는 이 약관의 내용과 상호 및 대표자 성명,
                영업소 소재지, 전화번호, 모사전송번호(FAX), 전자우편주소,
                사업자등록번호, 통신판매업신고번호 등을 &apos;이용자&apos;가
                쉽게 알 수 있도록 &apos;사이트&apos;의 초기 서비스화면에
                게시합니다. 다만, 본 약관의 내용은 이용자가 연결화면을 통하여
                확인할 수 있도록 할 수 있습니다.
              </p>
              <p>
                2. &apos;회사&apos;는 &apos;이용자&apos;가 약관에 동의하기에
                앞서 약관에 정해진 내용 중 청약철회, 배송책임, 환불조건 등과
                같은 내용을 &apos;이용자&apos;가 이해할 수 있도록 별도의
                연결화면 또는 팝업화면 등을 통하여 이용자의 확인을 구합니다.
              </p>
              <p>
                3. &apos;회사&apos;는 &apos;전자상거래법&apos;,
                &apos;약관규제법&apos;, &apos;전자문서법&apos;,
                &apos;전자금융거래법&apos;, &apos;정보통신망법&apos;,
                &apos;소비자기본법&apos; 등 관계법령에 위배되지 않는 범위 내에서
                본 약관을 개정할 수 있습니다.
              </p>
              <p>
                4. &apos;회사&apos;가 본 약관을 개정하고자 할 경우, 적용일자 및
                개정사유를 명시하여 현행약관과 함께 온라인 쇼핑몰의 초기화면에
                그 적용일자 7일전부터 적용일자 전날까지 공지합니다. 다만,
                &apos;이용자&apos;에게 불리한 내용으로 약관을 변경하는 경우 최소
                30일 이상 유예기간을 두고 공지합니다.
              </p>
              <p>
                5. &apos;회사&apos;가 본 약관을 개정한 경우, 개정약관은 적용일자
                이후 체결되는 계약에만 적용되며 적용일자 이전 체결된 계약은 개정
                전 약관이 적용됩니다. 다만, 이미 계약을 체결한
                &apos;이용자&apos;가 개정약관의 내용을 적용받고자 하는 뜻을
                &apos;회사&apos;에게 전달하고, &apos;회사&apos;가 여기에 동의한
                경우 개정약관을 적용합니다.
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">제5조(서비스의 제공 및 변경)</h2>
            <button
              onClick={() => toggleSection('section5')}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {openSections['section5'] ? '접기' : '자세히 보기'}
            </button>
          </div>
          {openSections['section5'] && (
            <div className="mt-4 space-y-2">
              <p>
                1. &apos;회사&apos;가 제공하는 서비스는 연중무휴, 1일 24시간
                제공을 원칙으로 합니다. 다만, 시스템의 유지보수를 위한 점검,
                통신 장비의 교체 등 특별한 사유가 있는 경우 서비스의 전부 또는
                일부에 대하여 일시적으로 제공을 중단할 수 있습니다.
              </p>
              <p>
                2. &apos;회사&apos;는 전시, 사변, 천재지변 또는 이에 준하는
                국가비상사태가 발생하거나 발생할 우려가 있는 경우,
                전기통신사업법에 의한 기간통신사업자가 전기통신서비스를 중지하는
                등 부득이한 사유가 발생한 경우 서비스의 전부 또는 일부를
                제한하거나 중지할 수 있습니다.
              </p>
              <p>
                3. &apos;회사&apos;가 서비스를 정지하거나 이용을 제한하는 경우
                그 사유 및 기간, 복구 예정 일시 등을 지체 없이
                &apos;이용자&apos;에게 알립니다.
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">제6조(제공하는 서비스)</h2>
            <button
              onClick={() => toggleSection('section6')}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {openSections['section6'] ? '접기' : '자세히 보기'}
            </button>
          </div>
          {openSections['section6'] && (
            <div className="mt-4 space-y-2">
              <p>&apos;회사&apos;가 제공하는 서비스는 다음과 같습니다.</p>
              <p>1. 전자상거래 플랫폼 개발 및 운영서비스</p>
              <p>2. 판매관련 지원서비스</p>
              <p>3. 구매관련 지원서비스</p>
              <p>4. 매매계약체결에 필요한 정보제공 서비스</p>
              <p>5. 상품 정보검색 서비스</p>
              <p>6. 서비스 제공에 따른 정산 서비스</p>
              <p>7. 기타 &apos;회사&apos;가 정하는 서비스</p>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">부칙</h2>
            <button
              onClick={() => toggleSection('appendix')}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {openSections['appendix'] ? '접기' : '자세히 보기'}
            </button>
          </div>
          {openSections['appendix'] && (
            <div className="mt-4 space-y-2">
              <p>제1조(시행일) 본 약관은 2024.12.01. 부터 적용합니다.</p>
            </div>
          )}
        </section>
      </div>

      <div className="mt-12 pt-8 border-t text-sm text-gray-600">
        <p>
          &quot;중고나&quot; 상점의 판매상품을 제외한 모든 상품들에 대하여,
          (주)중고나는 통신판매중개자로서 거래 당사자가 아니며 판매 회원과 구매
          회원 간의 상품거래 정보 및 거래에 관여하지 않고, 어떠한 의무와 책임도
          부담하지 않습니다.
        </p>
      </div>
    </div>
  );
};

export default TOSPage;
