const icons = [
  "Vector.svg",
  "Union.svg",
  "partnerIcon.svg",
  "setting_icon.svg",
  "Ellipse.svg",
];

export const Header = () => (
  <header className="flex justify-between items-center h-16">
    <h3 className="font-inter font-semibold text-2xl capitalize leading-none">
      Hi Kate!
    </h3>
    <div className="flex gap-4">
      {icons.map((icon, index) => (
        <img key={index} className="w-6 h-6" src={`../public/${icon}`} alt="" />
      ))}
    </div>
  </header>
);
