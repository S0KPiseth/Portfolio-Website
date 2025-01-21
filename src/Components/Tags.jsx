const Tags = ({ name, color }) => {
  return (
    <div className="w-fit h-[25px] p-1 px-1 gap-x-1 rounded-xl bg-blue-200 flex items-center text-blue-800">
      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color || "#000000" }}></div>
      <p className="text-[10px]">{name}</p>
    </div>
  );
};
export default Tags;
