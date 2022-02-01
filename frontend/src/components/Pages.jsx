import React from "react";
import { Pagination, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const generatePageRange = (currentPage, lastPage, delta = 2) => {
    // creates array with base 1 index
    const range = Array(lastPage)
        .fill()
        .map((_, index) => index + 1);

    return range.reduce((pages, page) => {

        if (page === 1 || page === lastPage) {
            return [...pages, page];
        }

        if (page - delta <= currentPage && page + delta >= currentPage) {
            return [...pages, page];
        }

        if (pages[pages.length - 1] !== '...') {
            return [...pages, '...'];
        }

        return pages;
    }, []);
}



function Pages({ className, links, totalPages, currentPage }) {

  const navigate = useNavigate()
  
  currentPage ? currentPage = Number(currentPage) : currentPage = 1


  console.log(generatePageRange(currentPage, totalPages));
  return (
      <Pagination className="justify-content-center mt-5 mb-5">
        <Pagination.First href="?page=1"/>
        <Pagination.Prev href={links.previous}/>
        {generatePageRange(currentPage, totalPages).map((page, index) =>{
            if(page === currentPage){
                return <Pagination.Item key={index} active>{page}</Pagination.Item>
            }else if(page==='...'){
                return <Pagination.Ellipsis key={index} disabled/>
            }else{
                return <Pagination.Item key={index} href={`?page=${page}`}>{page}</Pagination.Item>
            }
        })}
        <Pagination.Next href={links.next}/>
        <Pagination.Last href={`?page=${totalPages}`}/>
      </Pagination>
  );
}

export default Pages;
