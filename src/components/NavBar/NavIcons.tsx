import { MdMyLocation, MdOutlineLocationOn } from "react-icons/md";

type Props = {
  location?: string;
  onClick: React.MouseEventHandler<SVGAElement>;
};

function NavIcons(iconsProps: Props) {
  return (
    <div className="flex justify-between items-center gap-2 mr-3">
      <MdMyLocation
        title="Your Current Location"
        onClick={iconsProps.onClick}
        className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
      />
      <MdOutlineLocationOn className="text-3xl" />
      <p className="text-slate-900/80 text-sm">{iconsProps.location}</p>
    </div>
  );
}

export default NavIcons;
