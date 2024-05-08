// Кружок загрузки страницы
export const Loader = () => {
  return (
    <div className="absolute top-0 bottom-0 w-full h-full backdrop-blur-sm flex justify-center align-middle">
      <div className="relative mt-16">
        <div className="w-20 h-20 border-slate-200 border-2 rounded-full"></div>
        <div className="w-20 h-20 border-blue-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  );
};
