// "use client";
// import { useState } from "react";

// export default function TextToImage() {
//   const [text, setText] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const generateImage = async () => {
//     if (!text) return;
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://api.api-ninjas.com/v1/texttoimage?text=${encodeURIComponent(
//           text
//         )}`,
//         {
//             headers: { "X-Api-Key": `${process.env.NEXT_PUBLIC_API_NINJAS_KEY}` },

//         }
//       );
//       const data = await response.json();
//       setImage(data.image_url);
//     } catch (error) {
//       console.error("Error generating image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-5">
//       <input
//         type="text"
//         placeholder="Enter text..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="border p-2 rounded mb-3"
//       />
//       <button
//         onClick={generateImage}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Generating..." : "Generate Image"}
//       </button>
//       {image && <img src={image} alt="Generated" className="mt-4" />}
//     </div>
//   );
// }




"use client";
import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = async () => {
    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch(
        "https://api.api-ninjas.com/v1/passwordgenerator?length=16",
        {
          headers: { "X-Api-Key": `q0ARP/qnOqXnSa1D3GO3YA==k34536jRrKLrd2WE` },
        }
      );

      if (!response.ok) throw new Error("Failed to generate password");

      const data = await response.json();
      setPassword(data.random_password);
    } catch (err) {
      setError("Failed to generate password. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-5 rounded-md">
      <div className="glassmorphism-card p-6 rounded-xl shadow-xl max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-4">🔐 Password Generator</h1>
        
        <button
          onClick={generatePassword}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Password"}
        </button>

        {error && <p className="text-red-400 mt-3">{error}</p>}

        {password && (
          <div className="relative bg-gray-800 p-3 rounded-lg mt-5 flex items-center justify-between">
            <span className="text-lg font-mono tracking-wider">{password}</span>
            <button onClick={copyToClipboard} className="text-gray-300 hover:text-white transition-all duration-200">
              {copied ? <CheckCircle className="text-green-400" size={20} /> : <Copy size={20} />}
            </button>
          </div>
        )}
      </div>

      {/* Glassmorphism CSS */}
      <style jsx>{`
        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
