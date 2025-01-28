import React, { useState } from 'react';
import { Upload, FileText, Database, Languages, AlertTriangle, CheckCircle2, Loader2, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExtractedData {
  invoiceNumber: string;
  totalAmount: string;
  date: string;
  company: string;
  baseAmount: string;
  taxAmount: string;
  recipientName: string;
  recipientAddress: string;
  senderName: string;
  senderAddress: string;
}

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    // Simulate AI processing with mock data
    setTimeout(() => {
      const mockData: ExtractedData = {
        invoiceNumber: 'INV-2024-001',
        totalAmount: '$1,234.56',
        date: 'March 15, 2024',
        company: 'Example Corp',
        baseAmount: '$1,050.00',
        taxAmount: '$184.56',
        recipientName: 'John Doe',
        recipientAddress: '123 Business St, City, Country',
        senderName: 'Supplier Inc',
        senderAddress: '456 Vendor Ave, Town, Country'
      };
      setExtractedData(mockData);
      setIsProcessing(false);
    }, 2000);
  };

  const downloadExcel = () => {
    if (!extractedData) return;

    // Create worksheet data
    const wsData = [
      ['INVOICE PROCESSING RESULTS'],
      [''],
      ['INVOICE DETAILS'],
      ['Invoice Number:', extractedData.invoiceNumber],
      ['Date:', extractedData.date],
      ['Base Amount:', extractedData.baseAmount],
      ['Tax Amount:', extractedData.taxAmount],
      ['Total Amount:', extractedData.totalAmount],
      [''],
      ['COMPANY INFORMATION'],
      ['Company Name:', extractedData.company],
      [''],
      ['SENDER INFORMATION'],
      ['Name:', extractedData.senderName],
      ['Address:', extractedData.senderAddress],
      [''],
      ['RECIPIENT INFORMATION'],
      ['Name:', extractedData.recipientName],
      ['Address:', extractedData.recipientAddress]
    ];

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set column widths
    ws['!cols'] = [
      { wch: 20 }, // Column A
      { wch: 40 }  // Column B
    ];

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Invoice Data');

    // Generate the Excel file
    XLSX.writeFile(wb, 'invoice_data.xlsx');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="p-6 text-center animate-fade-in">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">
          🤖 AI Invoice Processor 📄
        </h1>
        <p className="text-xl text-blue-300">Transform your invoices into structured data ✨</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-4 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
                ${isDragging ? 'border-green-400 bg-green-400/10' : 'border-blue-400 hover:border-blue-300'}
                ${isProcessing ? 'animate-pulse' : ''}
              `}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-semibold mb-2">Drop your invoice here 📥</h2>
              <p className="text-blue-300">or click to browse</p>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-900/50 backdrop-blur-sm">
                <FileText className="w-8 h-8 mb-2 text-blue-400" />
                <h3 className="font-semibold">Multiple Formats</h3>
                <p className="text-sm text-blue-300">Support for various invoice layouts 📋</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-900/50 backdrop-blur-sm">
                <Database className="w-8 h-8 mb-2 text-purple-400" />
                <h3 className="font-semibold">Structured Data</h3>
                <p className="text-sm text-purple-300">Organized output format 📊</p>
              </div>
              <div className="p-4 rounded-lg bg-pink-900/50 backdrop-blur-sm">
                <Languages className="w-8 h-8 mb-2 text-pink-400" />
                <h3 className="font-semibold">Multi-language</h3>
                <p className="text-sm text-pink-300">Process various languages 🌍</p>
              </div>
              <div className="p-4 rounded-lg bg-green-900/50 backdrop-blur-sm">
                <AlertTriangle className="w-8 h-8 mb-2 text-green-400" />
                <h3 className="font-semibold">Error Detection</h3>
                <p className="text-sm text-green-300">Smart validation system ✅</p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Processing Status
            </h2>
            
            {isProcessing ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
              </div>
            ) : extractedData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>File processed successfully! 🎉</span>
                  </div>
                  <button
                    onClick={downloadExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Excel
                  </button>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-4">Extracted Data:</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-blue-300 mb-2">Invoice Details</h4>
                        <div className="space-y-2 text-sm">
                          <p>📄 Number: {extractedData.invoiceNumber}</p>
                          <p>💰 Total: {extractedData.totalAmount}</p>
                          <p>💵 Base Amount: {extractedData.baseAmount}</p>
                          <p>💲 Tax: {extractedData.taxAmount}</p>
                          <p>📅 Date: {extractedData.date}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-300 mb-2">Company Details</h4>
                        <div className="space-y-2 text-sm">
                          <p>🏢 Sender: {extractedData.senderName}</p>
                          <p>📍 Address: {extractedData.senderAddress}</p>
                          <p>👤 Recipient: {extractedData.recipientName}</p>
                          <p>📍 Address: {extractedData.recipientAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <p>Upload an invoice to see the magic ✨</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;