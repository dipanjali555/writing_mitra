import { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default function CreativeWriterPage() {

  const [data, setData] = useState({
    type: "poem",
    feeling: "",
    result: "",
    loading: false,
  });

  const handleGenerate = async () => {
    if (!data.feeling) {
      setData((prev) => ({
        ...prev,
        result: "⚠️ Please describe your feeling.",
      }));
      return;
    }

    setData((prev) => ({
      ...prev,
      loading: true,
      result: "",
    }));

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/chat",
        {
          model: "command-a-03-2025",
          message: `
Write a ${data.type} based on the following feeling:

"${data.feeling}"

Strict Rules:
- Output ONLY the final content
- Do NOT include any explanation
- Do NOT include "Generated Content"
- Do NOT use markdown (no \`\`\`)
- Start directly with HTML content
- Write in Hindi language only
- Use clean HTML tags like <h2>, <p>, <br>

Important:
Return ONLY pure HTML content. Nothing else.
          `,
        },
        {
          headers: {
            Authorization: "Bearer bhWCucF0Uh5kHGU5qHSIekmnN223enpym5XT5EBv",
            "Content-Type": "application/json",
          },
        }
      );

      let aiText =
        response.data.text ||
        response.data.message?.content?.[0]?.text ||
        "No content generated.";

      aiText = aiText
        .replace(/```html/g, "")
        .replace(/```/g, "")
        .replace(/\*\*Explanation:[\s\S]*/i, "")
        .trim();

      setData((prev) => ({
        ...prev,
        result: aiText,
      }));
    } catch (err) {
      setData((prev) => ({
        ...prev,
        result: "❌ Error: " + (err.response?.data?.message || err.message),
      }));
    }

    setData((prev) => ({
      ...prev,
      loading: false,
    }));
  };

  const downloadPDF = () => {
    if (!data.result) {
      alert("No content to download");
      return;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data.result;
    const cleanText = tempDiv.innerText || "";

    const pdfContainer = document.createElement("div");

    pdfContainer.style.padding = "20px";
    pdfContainer.style.background = "#ffffff";
    pdfContainer.style.color = "#000";
    pdfContainer.style.fontSize = "14px";
    pdfContainer.style.lineHeight = "1.4";
    pdfContainer.style.width = "800px";

    pdfContainer.innerHTML = `
      <h2 style="text-align:center; margin-bottom:10px;">
        ${data.type.toUpperCase()}
      </h2>
      <div style="white-space: pre-line;">
        ${cleanText}
      </div>
    `;

    document.body.appendChild(pdfContainer);

    const opt = {
      margin: 10,
      filename: `${data.type}-${Date.now()}.pdf`,
      html2canvas: {
        scale: 2,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(opt)
      .from(pdfContainer)
      .save()
      .then(() => {
        document.body.removeChild(pdfContainer);
      });
  };

  return (
    <div className="page-container d-flex justify-content-center align-items-center">
      <style>{`
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffe4ec, #ffd6e8);
          padding: 40px 15px;
        }
        .card-custom {
          width: 100%;
          max-width: 750px;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          padding: 30px;
        }
        .card-custom h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #ff4d88; /* 🔥 Pink Heading */
        }
        .btn-custom {
          background: linear-gradient(90deg, #ff6a9f, #ff4d88); /* 🔥 Pink Button */
          color: white;
          border: none;
          font-weight: 600;
        }
        .btn-custom:hover {
          background: linear-gradient(90deg, #ff4d88, #ff6a9f);
        }
        .output-box {
          margin-top: 20px;
          padding: 15px;
          background: #f3f0ff;
          border-left: 5px solid #4a00e0;
          border-radius: 10px;
          max-height: 400px;
          overflow-y: auto;
        }
      `}</style>

      <div className="card-custom">
        <h1>Creative Writer ✍️</h1>

        <select
          className="form-control mb-3"
          value={data.type}
          onChange={(e) =>
            setData((prev) => ({ ...prev, type: e.target.value }))
          }
        >
          <option value="poem">Poem</option>
          <option value="shayari">Shayari</option>
          <option value="ghazal">Ghazal</option>
        </select>

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Describe your feeling (e.g., heartbreak, happiness...)"
          value={data.feeling}
          onChange={(e) =>
            setData((prev) => ({ ...prev, feeling: e.target.value }))
          }
        />

        <button
          className="btn btn-custom w-100"
          onClick={handleGenerate}
          disabled={data.loading}
        >
          Submit
        </button>

        {data.loading && (
          <div className="d-flex justify-content-center">
            <img src="/loading.gif" alt="" style={{ width: "100px" }} />
          </div>
        )}

        {data.result && (
          <>
            <div className="output-box">
              <div dangerouslySetInnerHTML={{ __html: data.result }} />
            </div>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={downloadPDF}
            >
              Download PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
}