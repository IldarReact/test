import React from "react";

const Home = () => {

  const pages = [
    {
      id: 1,
      title: "Компании с наибольшей текущей ценой",
      filter: "highest_price",
    },
    {
      id: 2,
      title: "Компании IT сектора",
      filter: "it_sector",
    },
    {
      id: 3,
      title: "Компании с высоким потенциалом",
      filter: "highest_potential",
    },
  ];

  return (
    <div className="w-full mt-[100px]">
      <div className="mx-auto w-[1080px] ml-[50px]">
        <h1 className="text-black font-bold">Портфели</h1>
        <ul className="mt-[30px]">
          {pages.map((page) => (
            <li key={page.id} className="">
              <a
                href={`/TablePage/${page.id}?title=${encodeURIComponent(page.title)}&filter=${page.filter}`}
                className="text-blue-500 hover:underline"
              >
                {page.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
