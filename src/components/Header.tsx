export const Header = () => {
    return (
<header className="flex justify-between h-16 items-center">
        <h3 className="font-inter font-semibold text-[20px] leading-[100%] tracking-[0] capitalize">
            hi Kate!
        </h3>
        <div className="flex gap-4">
          <img
            className="w-6 h-6"
            src="../public/Ellipse.svg"
            alt=""
          />
          <img
            className="w-6 h-6"
            src="../public/partnerIcon.svg"
            alt=""
          />
          <img className="w-6 h-6" src="../public/Union.svg" alt="" />
          <img
            className="w-6 h-6"
            src="../public/Vector.svg"
            alt=""
          />
        </div>
      </header>
    );
};
