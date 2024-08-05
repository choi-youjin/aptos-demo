const useAppHeaderClassName = () => {
    const bgClassName = 'transition-[backdrop-filter,background-color] Bg_glass';
    const gridClassName = 'Component h-app_header_height flex items-center justify-between px-app_header_padding_x';
  
    return `${gridClassName} ${bgClassName}`;
  };
  
  export default useAppHeaderClassName;
  