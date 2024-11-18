const Footer = () => {
  return (
    <div className="w-full h-fit bg-[#444444]">
      <div className="py-8 px-12 flex flex-col justify-center items-center gap-4">
        <img src="/icons/logo_svg_square_white.svg" alt="logo" width={80} height={80} className="w-20 h-20" />
        <ul className="flex flex-wrap text-gray400 text-md gap-4">
          <li className="li-after">AUTHOR: Clound 2기 Team-7</li>
          <li className="li-after">CONTACT: ax34554@gmail.com</li>
          <li className="li-after">ADDRESS: 서울특별시 강남구 선릉로 433, 신관 6층</li>
        </ul>
        <p className="text-gray400">본 사이트는 포트폴리오용으로만 사용됩니다.</p>
        <div>
          <address className="text-center not-italic text-gray400">ⓒ 2024 TEAM-7. ALL RIGHTS RESERVED.</address>
        </div>
      </div>
    </div>
  );
};

export default Footer;
