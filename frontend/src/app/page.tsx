'use client';

import { useState } from 'react';

export default function Home() {
  const [pingResponse, setPingResponse] = useState('Click button to test');
  const [files, setFiles] = useState([{ id: 1, name: 'example.txt', size: '1.5kb', type: 'image' }]);
  const [users, setUsers] = useState([{
    id: 1,
    fullname: 'Tegar Maulana Fahreza',
    username: 'lowscarlet',
    email: 'lowscarlet@gmail.com',
    password: '12345'
  }]);

  const handlePing = async () => {
    try {
      const response = await fetch('https://'+process.env.NEXT_PUBLIC_BACKEND_DOMAIN+'/api/ping');
      const data = await response.text();
      setPingResponse(data);
    } catch (error) {
      setPingResponse('Error: ' + (error instanceof Error ? error.message : 'Unknown error occurred'));
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) return;
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/db', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setFiles(prev => [...prev, data]);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleGenerateRandom = async () => {
    try {
      const response = await fetch('/api/multer');
      const data = await response.json();
      setUsers(prev => [...prev, data]);
    } catch (error) {
      console.error('Generate error:', error);
    }
  };

  return (
    <main className="space-y-8 p-6">
      <section className="p-6 text-center">
        <h1 className="font-semibold text-2xl">Selamat datang di halaman Testing Arsitektur Cloud Native!</h1>
        <p>Ini Merupakan langkah awal dari perjalanan menuju projek yang lebih besar.</p>
      </section>
      <section className="bg-white shadow-md p-6 rounded-2xl">
        <h1 className="font-semibold text-xl">Public Variables</h1>
        <p className="mb-4 font">Sharing Environment Variables Between Services</p>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">No</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">1</td>
                <td className="p-2 border">FRONTEND_PUBLIC_DOMAIN</td>
                <td className="p-2 border">frontend.nt.lowscarlet.my.id</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white shadow-md p-6 rounded-2xl">
        <h1 className="text-xl -semibold">Call Backend</h1>
        <p className="mb-4 font">Will fetch api from /api/ping</p>
        <div className="space-y-4">
          <button 
            onClick={handlePing}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
            Call
          </button>
          <div>
            <textarea 
              cols={30} 
              disabled 
              className="p-2 border rounded-md w-full" 
              value={pingResponse}
            ></textarea>
          </div>
        </div>
      </section>

      <section className="bg-white shadow-md p-6 rounded-2xl">
        <h1 className="font-semibold text-xl">Persistent Storage</h1>
        <p className="mb-4 font">Will fetch api from /api/db</p>
        <div className="flex sm:flex-row flex-col gap-4 mb-4">
          <input 
            type="file" 
            onChange={handleUpload}
            className="p-2 border rounded-md grow" 
          />
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white">Upload</button>
        </div>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">No</th>
                <th className="p-2 border">Filename</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={file.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{file.name}</td>
                  <td className="p-2 border">{file.size}</td>
                  <td className="p-2 border">{file.type}</td>
                  <td className="p-2 border text-blue-600 hover:underline cursor-pointer">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white shadow-md p-6 rounded-2xl">
        <h1 className="font-semibold text-xl">Relational Database Storage</h1>
        <p className="mb-4 font">Will fetch api from /api/multer</p>
        <div className="mb-4">
          <button 
            onClick={handleGenerateRandom}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg w-full sm:w-auto text-white">
            Generate Random
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">No</th>
                <th className="p-2 border">Fullname</th>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{user.fullname}</td>
                  <td className="p-2 border">{user.username}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      <section className="p-6 text-center">
        +_+_+_+_+ LowScarlet - <a className="text-red-500" href="https://lowscarlet.my.id/">lowscarlet.my.id</a> +_+_+_+_+
      </section>
    </main>
  );
}