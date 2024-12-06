import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css'
const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPassword = async () => {
    let req = await fetch('http://localhost:3000')
    let passwords = await req.json();
    setpasswordArray(passwords);
    console.log(passwords)
  }
  useEffect(() => {
    getPassword()
  }, []);

  const copyText = (text) => {
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {

    const closePath = "Assets/close.png";
    const openPath = "Assets/open.png";
    passwordRef.current.type = "text";
    if (ref.current.src.endsWith(closePath)) {
      ref.current.src = openPath;
      passwordRef.current.type = "text";
    } else {
      ref.current.src = closePath;
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        await fetch('http://localhost:3000/', {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})

        await fetch('http://localhost:3000/', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" })
      toast('Saved Password', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast('Too Short chart');
    }
  }
  const deletePassword = async (id) => {
    console.log("This item will be deleted", id);
    let c = confirm("Do you really want to delete this password");
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      // localStora/ge.setItem('passwords', JSON.stringify([...passwordArray.filter(item => item.id !== id)]));
      await fetch('http://localhost:3000/', {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id})})
      toast('Delete Password', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const editPassword = (id) => {
    console.log("this item will be edit", id);
    setform({...passwordArray.filter(i => i.id === id)[0], id: id})
    setpasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce" />
      {/* Same as */}
      <ToastContainer />
      <div className="my-container text-white h-screen">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-400">&lt;</span>
          <span>Pass</span>
          <span className="text-green-400">OP/&gt;</span>
        </h1>
        <p className="text-green-400 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="input-con text-white flex flex-col p-4 items-center gap-10">
          <input
            className="mt-5 rounded-full bg-transparent border-[2px] text-white px-8 py-2 outline-none w-full"
            type="text"
            name="site"
            id="site"
            placeholder="Enter website URL"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex w-full justify-between gap-8">
            <input
              className="w-full rounded-full bg-transparent border-[2px] text-white px-8 py-2 outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative w-full">
              <input ref={passwordRef}
                className="w-full rounded-full bg-transparent border-[2px] text-white px-8 py-2 outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-4 cursor-pointer top-[10px]"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="../../public/Assets/close.png"
                  alt=""
                  className="w-[20px]"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="save-button text-black font-semibold gap-2 flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full px-2 py-2 w-[30%]"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Passwords to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-400">
                <tr>
                  <th className="py-2 w-[10vw]">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className="border py-3 w-32 text-center relative"><a href={item.site} target="_blank">{item.site}</a>
                      <div className="size-7 cursor-pointer absolute right-[1rem] bottom-[0.5rem] lordiconcopy" onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/lyrrgrsl.json"
                          trigger="hover"
                          colors="primary:#ffffff">
                        </lord-icon>
                      </div>
                    </td>
                    <td className="border py-3 w-32 text-center relative">{item.username}
                      <div className="size-7 cursor-pointer absolute right-[1rem] bottom-[0.5rem] lordiconcopy" onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/lyrrgrsl.json"
                          trigger="hover"
                          colors="primary:#ffffff">
                        </lord-icon>
                      </div>
                    </td>
                    <td className="border py-3 w-32 text-center relative">{"*".repeat(item.password.length)}
                      <div className="size-7 cursor-pointer absolute right-[1rem] bottom-[0.5rem] lordiconcopy" onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/lyrrgrsl.json"
                          trigger="hover"
                          colors="primary:#ffffff">
                        </lord-icon>
                      </div>
                    </td>
                    <td className="border py-3 w-32 text-center relative">
                      <span className="cursor-pointer mr-5" onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/fikcyfpp.json"
                          trigger="hover"
                          delay="2000"

                          colors="primary:#ffffff,secondary:#ffffff"
                          style={{ "width": "30px", "height": "30px" }}>
                        </lord-icon>

                      </span>
                      <span className="cursor-pointer" onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/hwjcdycb.json"
                          trigger="hover"

                          colors="primary:#ffffff,secondary:#ffffff"
                          style={{ "width": "30px", "height": "30px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
        </div>
      </div>

    </>
  );
};

export default Manager;
