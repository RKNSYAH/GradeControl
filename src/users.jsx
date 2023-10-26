import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Users() {
  const [data, setData] = useState([]);


  async function fetchUser() {
    const res = await fetch(process.env.REACT_APP_API_URL + "students");
    const userData = await res.json();
    if (res.status === 200) setData(userData);
  }


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div id="userContainer">
        <div id="tableContainer">
          <table id="mainTable">
            <thead>
              <tr>
                <th>No</th>
                <th>NIS</th>
                <th>Name</th>
                <th>Adress</th>
                <th>Birth Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.nis}</td>
                    <td>{e.name}</td>
                    <td>{e.adress}</td>
                    <td>{e.birthdate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
