const SortOptions = () => {
  return (
    <div className="flex justify-between items-center mb-4 text-[#262220]">
      <button className="text-[#A15C38] font-bold hover:underline hover:text-[#8E4F31]">
        Sort by Location ▼
      </button>
      <button className="text-[#A15C38] font-bold hover:underline hover:text-[#8E4F31]">
        Sort by Lost/Found ▼
      </button>
    </div>
  );
};

export default SortOptions;
