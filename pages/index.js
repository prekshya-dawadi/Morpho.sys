import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleStartGeneration = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            router.push('/generation');
          } else {
            alert(data.error || 'Failed to upload file. Please try again.');
          }
        } else {
          alert('Failed to upload file. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bggg.png')" }}>
      <Head>
        <title>Morpho.sys - From Concept to Grant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <header className="w-full px-8 pt-6">
        <img src="/morphosys.png" alt="Morpho.sys logo" className="w-auto h-12" />
        <div className="border-t-2 border-[#41483C] mt-2"></div>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow flex items-center justify-center px-40 py-12">
        <div className="max-w-5xl w-full flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Left Section: Image and Text */}
          <div className="md:w-1/2 flex flex-col items-start text-left mb-40">
            <img
              src="/main.png"
              alt="Workspace Illustration"
              className="w-full max-w-md"
              style={{ width: "500px", height: "300px" }}
            />
            <h2 className="text-7xl md:text-7xl font-bold text-[#41483C] mt-8">
              From Concept<br />to Grant
            </h2>
            <p className="text-xl font-bold text-[#41483C] mt-4">
              Your AI <span className="bg-[#D9DFC6] px-2">Proposal Partner</span>
            </p>
          </div>

          {/* Right Section: Upload Form */}
          <div className="md:w-1/2 flex flex-col items-center space-y-8 mt-40">
            <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-[450px] h-[280px] flex flex-col justify-center items-center">
              <button
                className="w-[280px] bg-[#41483C] text-lg text-white rounded-full py-3 px-1 mb-6 hover:bg-[#55624C] hover:scale-105 transition-transform duration-200"
                onClick={() => document.getElementById('fileInput').click()}
              >
                Upload a PDF
              </button>

              <input
                type="file"
                id="fileInput"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              {file && (
                <div className="text-center mt-4">
                  <p className="text-gray-600 text-lg">
                    Selected File: {file.name}
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <button
                      className="text-[#41483C] text-sm px-4 py-1 rounded-full border border-[#41483C] bg-transparent hover:underline "
                      onClick={handleRemoveFile}
                    >
                      Remove File
                    </button>
                    <button
                      className="text-[#41483C] text-sm px-4 py-1 rounded-full border border-[#41483C] bg-transparent hover:underline "
                      onClick={handleStartGeneration}
                    >
                      Start Generating
                    </button>
                  </div>
                </div>
              )}
              <p className="text-gray-600 text-lg text-center mt-4">
                or drop a file,<br />
                paste doc or <span className="text-sm underline">URL</span>
              </p>
            </div>

            {/* Standard Format Section */}
            <div className="w-full flex justify-start items-center justify-center space-x-4">
              <p className="text-sm w-30 font-bold text-gray-600">No template? Try <br /> a standard format:</p>
              <div
                className="w-16 h-16 bg-white rounded-lg border border-gray-200"
                style={{ backgroundImage: 'url(/UNDP.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              <div
                className="w-16 h-16 bg-white rounded-lg border border-gray-200"
                style={{ backgroundImage: 'url(/USAID.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              <div
                className="w-16 h-16 bg-white rounded-lg border border-gray-200"
                style={{ backgroundImage: 'url(/wbank.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              <div
                className="w-16 h-16 bg-white rounded-lg border border-gray-200"
                style={{ backgroundImage: 'url(/af.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>

            </div>

            {/* Terms of Service and Privacy Policy */}
            <p className="text-xs text-gray-500 text-center">
              By uploading an image or URL, you agree to our{' '}
              <a href="#" className="underline">Terms of Service</a>. To learn more about how Morpho.sys handles your personal data, check our{' '}
              <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}