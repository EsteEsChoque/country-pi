import style from '../ruta2/Nav.module.css';

const Pagination = ({ allCountrys, currentPage, pagedNumber, countrysPerPage }) => {
  const pages = [];

  for (let i = 1; i < Math.ceil(allCountrys / countrysPerPage); i++) {
    pages.push(i);
  }


  let paisesMostrados = pages.slice(currentPage - 2, currentPage + 1);


  if (currentPage === 1) {
    paisesMostrados = pages.slice(currentPage - 1, currentPage + 1);
  } else if (currentPage === pages.length || currentPage === pages.length - 1) {
    paisesMostrados = pages.slice(currentPage - 1, currentPage);
  } else {
    paisesMostrados = pages.slice(currentPage - 1, currentPage + 1);
  }
  

  if (currentPage === pages.length) {
    paisesMostrados = pages.slice(currentPage - 1, currentPage);
  }
  return (
    <div className={style.paginadoContainer}>
      {pages.length > 1 && (
        <>
          {currentPage > 2 && (
            <div>
              <button className={style.page} onClick={() => pagedNumber(1)}>
                1
              </button>
            </div>
          )}
          {currentPage > 3 && (
            <div>
              <span>...</span>
            </div>
          )}
          {currentPage > 1 && (
            <div>
              <button
                className={style.page}
                onClick={() => pagedNumber(currentPage - 1)}
              >
                {currentPage - 1}
              </button>
            </div>
          )}
          {paisesMostrados.map((el) => (
            <div key={el}>
              <button className={style.page} onClick={() => pagedNumber(el)}>
                {el}
              </button>
            </div>
          ))}
          {currentPage < pages.length - 1 && (
            <div>
              <span>...</span>
            </div>
          )}
          {currentPage < pages.length && (
            <div>
              <button className={style.page} onClick={() => pagedNumber(pages.length)}>
                {pages.length}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
  
  
  
};

export default Pagination;
