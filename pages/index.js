import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-[#EFF3EA] to-[#FFFDF0] flex flex-col">
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
              <button className="w-[280px] bg-[#41483C] text-lg text-white rounded-full py-3 px-1 mb-6">
                Upload a PDF
              </button>
              <p className="text-gray-600 text-lg text-center">
                or drop a file,<br />
                paste doc or <span className="text - sm underline">URL</span>
              </p>
            </div>

            {/* Standard Format Section */}
            <div className="w-full flex justify-start items-center justify-center space-x-4">
              <p className="text-sm w-30 font-bold text-gray-600">No template? Try <br /> a standard format:</p>
              <div className="w-16 h-16 bg-white rounded-lg border border-gray-200"></div>
              <div className="w-16 h-16 bg-white rounded-lg border border-gray-200"></div>
              <div className="w-16 h-16 bg-white rounded-lg border border-gray-200"></div>
              <div className="w-16 h-16 bg-white rounded-lg border border-gray-200"></div>
            </div>

            {/* Link to Generation Page */}
            {/* <Link href="/generation" className="text-[#41483C] justify-right items-right text-lg font-medium">
              Start Generating →
            </Link>  */}

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
