import { PRIVACY_POLICY } from './constants';

const Privacy = () => {
  return (
    <div className="container px-60 pb-24 pt-6">
      <h1 className="text-4xl font-bold mb-12 text-center">개인정보 처리방침</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold py-2">1. 개인정보 처리방침 소개</h2>
        {PRIVACY_POLICY.INTRODUCTION.map((paragraph, idx) => (
          <p key={idx} className="py-2">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold py-2">2. 회원가입 없이도 이용 가능한 서비스</h2>
        {PRIVACY_POLICY.NON_MEMBER_SERVICE.map((paragraph, idx) => (
          <p key={idx} className="py-2">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold py-2">3. 수집하는 개인정보</h2>
        <h3 className="font-medium py-2">회원가입 시 수집</h3>
        <ul className="list-disc ml-5 mb-2">
          {PRIVACY_POLICY.COLLECTED_INFORMATION.MEMBERSHIP.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <h3 className="font-medium py-2">자동 수집 정보</h3>
        <ul className="list-disc ml-5 mb-2">
          {PRIVACY_POLICY.COLLECTED_INFORMATION.AUTOMATIC_COLLECTION.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold py-2">4. 개인정보의 이용 목적</h2>
        <ul className="list-disc ml-5 py-2">
          {PRIVACY_POLICY.USAGE.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold py-2">5. 개인정보의 파기</h2>
        <ul className="list-disc ml-5 py-2">
          {PRIVACY_POLICY.DATA_DESTRUCTION.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold py-2">6. 보안 대책</h2>
        <ul className="list-disc ml-5 py-2">
          {PRIVACY_POLICY.SECURITY_MEASURES.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold py-2">7. 이용자의 권리</h2>
        <ul className="list-disc ml-5 py-2">
          {PRIVACY_POLICY.USER_RIGHTS.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Privacy;
