export const HeaderBottom = () => {
  return (
    <div className="flex max-lg:flex-wrap justify-center md:justify-start mb-6">
      {[
        { label: "Leads", icon: "hav/mingcute_horn-line.svg" },
        { label: "Quotes", icon: "hav/documentIcon.svg", bg: "bg-[#B5B8FF]" },
        { label: "Jobs", icon: "hav/toolsIcon.svg" },
        { label: "Planner", icon: "hav/planer.svg" },
        { label: "Chat", icon: "Vector.svg" },
        { label: "Finance", icon: "hav/Group.svg" },
        { label: "Contacts", icon: "hav/contactIcon.svg" },
        { label: "Expenses", icon: "hav/moneyIcon.svg" },
        { label: "User", icon: "hav/lucide_user-round.svg" },
      ].map(({ label, icon, bg }, i) => (
        <div
          key={i}
          className={`w-[217px] h-[54px] pt-3 pb-3 flex justify-center gap-3 flex-col items-center rounded ${
            bg || ""
          }`}
        >
          <img className="w-6 h-6" src={`../public/${icon}`} alt="" />
          <div className="flex items-center justify-center">
            <span className="font-inter font-normal text-[14px] leading-[100%] capitalize">
              {label}
            </span>
            <img src="../public/weui_arrow-outlined.svg" alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};
