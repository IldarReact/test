import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const TablePage = () => {
  const location = useLocation();
  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");
  const { filter } = location.state || {};
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/tables/online-table-chn/"
      );

      let data = response.data;

      // Если данные приходят в виде строки, обрабатываем NaN
      if (typeof data === "string") {
        data = data.replace(/NaN/g, "null");
        data = JSON.parse(data);
      }

      setTableData(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const filterData = () => {
    let filteredData = Array.isArray(tableData)
      ? tableData
      : Object.values(tableData);

    // Применяем фильтр, если он определен
    switch (filter) {
      case "highest_price":
        return filteredData.length > 0
          ? filteredData
              .slice()
              .sort(
                (a, b) =>
                  parseFloat(b["Текущая цена"]) - parseFloat(a["Текущая цена"])
              )
              .slice(0, 10)
          : [];
      case "it_sector":
        return filteredData.length > 0
          ? filteredData.filter((company) => company["Сектор"] === "IT")
          : [];
      case "highest_potential":
        return filteredData.length > 0
          ? filteredData
              .slice()
              .sort(
                (a, b) =>
                  parseFloat(b["Потенциал"]) - parseFloat(a["Потенциал"])
              )
              .slice(0, 10)
          : [];
      default:
        return filteredData;
    }
  };

  const filteredData = filterData();

  return (
    <div className="container mx-auto p-4 mt-[200px]">
      <h1 className="text-3xl font-bold mb-6 text-black">{title}</h1>
      {filteredData.length > 0 ? (
        <div className="overflow-x-auto rounded-[30px] border border-gray-500 w-full font-bold">
          <table className="w-full bg-white text-right">
            <thead className="">
              <tr className="text-black bg-gray-100">
                <th className="py-3 px-4 border-b text-left">Название</th>
                <th className="py-3 px-4 border-b text-left">Тикер</th>
                <th className="py-3 px-4 border-b text-left">Сектор</th>
                <th className="py-3 px-4 border-b text-left">Отрасль</th>
                <th className="py-3 px-4 border-b text-left">Уровень риска</th>
                <th className="py-3 px-4 border-b text-left">
                  Ср-срочн. потенциал
                </th>
                <th className="py-3 px-4 border-b text-left">Текущая цена</th>
                <th className="py-3 px-4 border-b text-left">Точка входа</th>
                <th className="py-3 px-4 border-b text-left">Точка входа $</th>
                <th className="py-3 px-4 border-b text-left">Потенциал</th>
                <th className="py-3 px-4 border-b text-left">
                  Долгосрочный потенциал
                </th>
                <th className="py-3 px-4 border-b text-left">Валюта</th>
                <th className="py-3 px-4 border-b text-left">
                  Потенциал роста
                </th>
                <th className="py-3 px-4 border-b text-left">
                  Долгосрочный потенциал роста
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredData) &&
                filteredData.map((company, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200 text-black`}
                  >
                    <td className="py-2 px-4 border-b">
                      {company["Название"] || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {company["Тикер"] || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {company["Сектор"] || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {company["Отрасль"] || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {company["Уровень риска"] || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {company["Ср-срочн. потенциал"] || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {parseFloat(company["Текущая цена"]) || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {parseFloat(company["Точка входа"]) || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {parseFloat(company["Точка входа $"]) || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {parseFloat(company["Потенциал"]) || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {parseFloat(company["Долгосрочный потенциал"]) || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {company["Валюта"] || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {company["Потенциал роста"] || " - "}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {company["Долгосрочный потенциал роста"] || " - "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-black">Нет данных для отображения</p>
      )}
    </div>
  );
};

export default TablePage;
